import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

interface INewUser {
  username: string;
  firstName: string;
  lastName?: string;
  nickname?: string;
  email: string;
  password: string;
  admin: boolean;
  roles?: string;
}

class UserController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const users = await User.find({
      select: ["id", "username", "permission"], //We don't want to send the passwords on response
    });

    //Send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = +req.params.id;

    try {
      //Get the user from database
      const user = await User.findOneOrFail({
        where: { id },
        select: ["id", "username", "permission"], //We don't want to send the password on response
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    try {
      //Get parameters from the body
      const {
        username,
        password,
        email,
        nickName,
        firstName,
        lastName,
        permission,
      } = req.body;
      const user = new User();

      user.username = username;
      user.nickName = nickName ?? username;
      user.permission = permission;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.savePassword(password);

      //Validate if the parameters are ok
      await validate(user);

      //Hash the password, to securely store on DB
      // user.hashPassword();

      //Try to save. If fails, the username is already in use
      await user.save();

      //If all ok, send 201 response
      res.status(201).send("User created");
    } catch (e) {
      res.status(409).send("Something wrong, verify the data sended");
      return;
    }
  };

  static editUser = async (req: Request, res: Response) => {
    try {
      //Get the ID from the url
      const id: number = +req.params.id;

      //Get values from the body
      const { username, permission } = req.body;

      //Try to find user on database
      const user = await User.findOneOrFail({ where: { id } });

      //Validate the new values on model
      user.username = username;
      user.permission = permission;

      await validate(user);

      //Try to safe, if fails, that means username already in use
      user.save();
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send(error);
      return;
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = +req.params.id;

    try {
      const user = await User.findOneOrFail({ where: { id } });

      user.softRemove();

      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
  };
}

export default UserController;
