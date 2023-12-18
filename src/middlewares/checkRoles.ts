import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export const checkRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the user ID from previous middleware
  const id = res.locals.jwtPayload.userId;

  // Get user role from the database
  try {
    const user = await User.findOneOrFail({
      relations: ["roles.role"],
      where: { id },
    });

    const permissions = await user.getPermissions();

    res.locals.jwtPayload.permission = permissions;

    // Check if array of authorized roles includes the user's role
    if (permissions.length) next();
    else {
      throw new Error(id);
    }
  } catch (err: any) {
    res.status(401).send("You can't access to this resource");
  }
};
