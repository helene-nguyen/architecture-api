//~ Import modules
import jwt from 'jsonwebtoken';
import debug from 'debug';
const logger = debug('Jwt');
import { Request, Response, NextFunction } from 'express';
import { ErrorApi } from '../resources/services/errorHandling/errorHandler.js';

//~ Get refresh token
const getRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    //get token from header
    const authHeader = req.headers['authorization'];

    if (authHeader === undefined) throw new ErrorApi(req, res, 400, 'No token found !');

    //   header contains token "Bearer <token>", split the string and get the 2nd part of the array
    let refreshToken = authHeader.split(' ')[1];

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: unknown, user: any) => {
      if (err) {
        throw new ErrorApi(req, res, 403, 'The token is invalid!');
      }
      // reset refresh token in session
      req.session.refreshToken = [];
      req.user = user.user;

      next();
    });
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { getRefreshToken };
