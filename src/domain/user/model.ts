//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');
import { CoreModel } from '../core/coreModel.js';
import { ErrorApi } from '../../resources/services/errorHandling/errorHandler.js';
import { UserData } from './datamapper.js';
//~ Security
import bcrypt from 'bcrypt';

interface IBodyData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface IUserData {
  [key: string]: string;
}
class UserModel extends CoreModel {
  //& Properties
  data = UserData;
  passwordErrorMsg: string = `Not the same password.`;
  userExist: string = `Username or email already exists.`;

  //& Methods
  controlSignUp = async (req: Request, res: Response) => {
    let { username, email, password, passwordConfirm }: IBodyData = req.body;

    //~ Email already exist ?
    const userExist = await this.checkUser(username, email);
    if (userExist) throw new ErrorApi(req, res, 401, this.userExist);

    //~ Encrypt password if password exist
    if (password !== passwordConfirm) throw new ErrorApi(req, res, 401, this.passwordErrorMsg);

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //replace password in body
    req.body.password = password;

    // //~ Send an email to confirm creation
    // await sendEmail.toUser(email, 'subscribe');

    const result = await this.createOneItem(req.body);
    if (!result) return null;
  };

  controlAllUsersDetails = async () => {
    const users = await this.findAllItems();

    //~ Delete password display
    for (const user of users) {
      this.removePassword(user, 'password');
    }

    return users;
  };

  controlUserDetails = async (id: number) => {
    const user = await this.findOneItem(id);

    //~ Delete password display
    this.removePassword(user, 'password');

    return user;
  };

  //& Services Methods
  checkUser = async (username: string, email: string): Promise<void | null> => {
    const result = await UserData.findUserIdentity(username, email);
    if (!result) return null;

    return result;
  };

  removePassword = async (data: IUserData, property: string) => {
    delete data[`${property}`];
  };
}

const User = new UserModel();
export { User };
