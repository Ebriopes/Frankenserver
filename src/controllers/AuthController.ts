import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
import { validate } from "class-validator";

import { SECURE_COOKIE_OPTIONS, TOKEN } from "../config";
import { User } from "../entity/User";
import { EntityNotFoundError } from "typeorm";

class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Check if username and password are set
      const { username, password } = req.body;

      if (!(username && password)) throw new Error("Missing data");

      //Get user from database
      const user = await User.findOneOrFail({
        where: { username },
      });

      //Check if encrypted password match
      if (!user.checkIfUnencryptedPasswordIsValid(password))
        throw new Error("Invalid credentials");

      // Create new refresh token to avoid request login to users
      const refreshToken = sign(
        {
          userId: user.id,
          username: user.username,
        },
        TOKEN.refreshSecrete,
        { expiresIn: TOKEN.refreshExpiresIn }
      );

      //Sing JWT, valid for 1 hour
      const token = sign(
        {
          userId: user.id,
          username: user.username,
          permission: user.permission,
        },
        TOKEN.secret,
        { expiresIn: TOKEN.expiresIn }
      );

      //Send the jwt in the response
      res
        .cookie("access_token", token, SECURE_COOKIE_OPTIONS)
        .cookie("refresh_token", refreshToken, SECURE_COOKIE_OPTIONS)
        .status(200)
        .json({ data: { access_token: token } });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        res.status(400).send("Invalid credentials");
      } else res.status(400).send((error as Error).message);
    }
  };

  static logout = (req: Request, res: Response, next: NextFunction) => {
    delete res.locals.jwtPayload;
    res.clearCookie("access_token").clearCookie("refresh_token");
  };

  static refreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      //We want to send a new refresh token when expires
      const refreshToken = req.signedCookies["refresh_token"];
      const jwtRefresh = <any>verify(refreshToken, TOKEN.refreshSecrete);
      const { userId, username } = jwtRefresh;

      const newToken = sign({ userId, username }, TOKEN.secret, {
        expiresIn: TOKEN.expiresIn,
      });

      res
        .cookie("access_token", newToken, SECURE_COOKIE_OPTIONS)
        .redirect("back");
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
      }

      res.status(401).send("You should login again");
    }
  };

  static changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    try {
      //Get parameters from the body
      const { oldPassword, newPassword } = req.body;
      if (!(oldPassword && newPassword)) throw new Error(id);

      //Get user from the database
      const user = await User.findOneOrFail(id);

      //Check if old password match
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword))
        throw new Error(id);

      //Validate de model (password length)
      // user.password = newPassword;
      await validate(user);

      user.savePassword(newPassword);

      //Hash the new password and save
      // user.hashPassword();
      user.save();

      res.status(204).send();
    } catch (id) {
      res.status(401).send();
    }
  };
}

export default AuthController;
