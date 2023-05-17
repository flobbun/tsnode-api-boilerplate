import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import config from "../configurations/config";
import { Errors } from "../constants/errors";

/**
 * @description Middleware to authenticate user
 */
export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const methodsToWatch = ["POST", "PUT", "DELETE", "PATCH", "GET"];
  const token = req.headers.authorization?.split(" ")[1];
  if (methodsToWatch.includes(req.method)) {
    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const decoded = verify(token as string, config.JWT_TOKEN as string);
      req.body.user = decoded;
    } catch (error) {
      return res.sendStatus(403);
    }
  }

  next();
};