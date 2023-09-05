//~ Import modules
import { NextFunction, Request, Response } from "express";

export const corsOptions = (req: Request, res: Response, next: NextFunction) => {
  // Access control need to be the authorized adress
  res.setHeader('Access-Control-Allow-Origin', ['http://localhost:5173']);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // Accept credentials (cookies) sent by the client

  // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
};
