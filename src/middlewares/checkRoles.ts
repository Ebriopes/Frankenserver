import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export const checkRoles = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous middleware
    const id = res.locals.jwtPayload.userId;

    // Get user role from the database
    try {
      const user = await User.findOneOrFail(id);

      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(user.role) > 1) next();
      else throw new Error(id);
    } catch (id) {
      res.status(401).send();
    }
  };
};
