//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');
import { CoreModel } from '../core/coreModel.js';
import { UserData } from './datamapper.js';

class UserModel extends CoreModel {
  data = UserData;
}

const User = new UserModel();
export { User };
