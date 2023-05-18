//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');
import { CoreController } from '../core/coreController.js';
import { User } from './model.js';

class UserController extends CoreController {
  model = User;
  paramsId = 'userId';

  doSignUp = async (req: Request, res: Response) => {
    try {
      await User.controlSignUp(req, res);
      //~ Result
      return res.status(201).json(this.createSuccessful);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  fetchAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.controlAllUsersDetails();
      //~ Result
      return res.status(200).json(users);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };
  
  fetchOneUser = async (req: Request, res: Response) => { 
    try {
      const id = +req.params[this.paramsId];

      const user = await User.controlUserDetails(id);
      //~ Result
      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }

  }
}

const user = new UserController();
export { user };
