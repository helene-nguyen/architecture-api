//~ Import module
import { ErrorApi } from '../resources/services/errorHandling/errorHandler.js';
import { Request, Response, NextFunction } from 'express';

//~ Authentication
const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) throw new ErrorApi(req, res, 401, `User not connected !`);

  next();
};

// const role = (req:Request, res:Response, next:NextFunction) => {
//   if (req.user?.role === 'admin') {
//     next();
//   } else {throw new ErrorApi(req, res, 403, `Accès interdit !`);}

// }

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') throw new ErrorApi(req, res, 403, `You cannot access this info, you're not admin, go away !`);
  next();
};

export { auth, admin };
