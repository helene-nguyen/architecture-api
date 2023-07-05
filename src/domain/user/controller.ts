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
      return res.status(201).json({ state: this.createSuccessful });
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  doSignIn = async (req: Request, res: Response) => {
    try {
      const userIdentity = await User.controlSignIn(req, res);

      //~ Result
      return res.status(200).json(userIdentity);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  doSignOut = async (req: Request, res: Response) => {
    try {
      req.user = null;
      req.session.destroy();

      //~ Result
      return res.status(204).json({ state: `User disconnected !` });
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  fetchAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.controlAllUsersRemovePwd();
      //~ Result
      return res.status(200).json(users);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  fetchOneUser = async (req: Request, res: Response) => {
    try {
      const id = +req.params[this.paramsId];

      const user = await User.controlUserRemovePwd(id);
      //~ Result
      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = +req.params[this.paramsId];
      await User.controlUpdatedUserDetails(req, res, id);

      //~ Result
      return res.status(200).json({ state: this.updateSuccessful });
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = +req.params[this.paramsId];
      await User.controlDeletedUserDetails(req, res, id);

      //~ Result
      return res.status(200).json({ state: this.deleteSuccessful });
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  fetchAllUsersMongo = async (req: Request, res: Response) => {
    try {
      const users = await User.allUsers();
      //~ Result
      return res.status(200).json(users);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };
}

const user = new UserController();
export { user };
