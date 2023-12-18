import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { TOKEN } from "../config";

const { JsonWebTokenError, verify } = jwt;

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  //Try to validate the token and get data
  try {
    //Get the jwt token from the head
    const token = req.signedCookies["access_token"];

    const jwtPayload = <any>verify(token, TOKEN.secret);

    res.locals.jwtPayload = jwtPayload;

    //Call the next middleware or controller
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.redirect("/token/refresh");
    }

    res.status(401).send();
  }
};
