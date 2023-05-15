import { errorLogger } from './errorLogger.js';
import { Request, Response } from 'express';

class ErrorApi extends Error {
    constructor(req: Request, res: Response, code: number = 500, message: string) {
    super(message);
    res.status(code).json({ message: message });

    //~ Log errors
    errorLogger(message, req, res);
  }
}

export { ErrorApi };
