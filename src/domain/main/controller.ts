//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');

const renderHomePage = (req: Request, res: Response) => {
  try {
    res.json({
      message: 'Welcome to Yumedo API',
    });
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { renderHomePage };
