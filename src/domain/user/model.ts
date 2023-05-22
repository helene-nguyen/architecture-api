//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Model');
import { CoreModel } from '../core/coreModel.js';
import { ErrorApi } from '../../resources/services/errorHandling/errorHandler.js';
import { UserData } from './datamapper.js';
import { sendEmail } from '../../resources/services/nodemailer/nodemailerAuto.js';
import { generateAccessToken, generateRefreshToken } from '../../resources/services/jsonWebToken.js';
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

interface IUserExist {
  password: string;
}
class UserModel extends CoreModel {
  //& Properties
  data = UserData;
  passwordErrorMsg: string = `Not the same password.`;
  userExist: string = `Username or email already exists.`;
  userNotExist: string = `Username or email doesn't exist. Create an account to connect.`;

  //& Methods
  controlSignUp = async (req: Request, res: Response) => {
    //~ Control user details
    const user = await this.controlUserDetails(req, res);

    await this.createOneItem(user);

    //~ Send an email to confirm creation
    this.handleEmail(user.email, 'subscribe');

    return;
  };

  controlSignIn = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    const userExist: IUserExist | null = await this.checkUser('_', email);
    if (!userExist) throw new ErrorApi(req, res, 401, this.userNotExist);

    //~ Security
    const passwordValid = this.isPasswordValid(userExist, password);
    if (!passwordValid) throw new ErrorApi(req, res, 401, this.notValidMsg);

    const { password: remove, ...user } = userExist!;

    // The ! non-null assertion operator is used to tell TypeScript that userExist is guaranteed to be non-null at this point, so the destructuring assignment will work correctly
    const { accessToken, refreshToken } = this.generatedTokens({ user }, req);

    const userIdentity = { ...user, accessToken, refreshToken };

    return userIdentity;
  };

  controlUpdatedUserDetails = async (req: Request, res: Response, userId: number) => {
    let userData = await this.controlUserDetails(req, res);
    const user = await this.findOneItem(userId);
    // uncomment when session active
    // if (!user || req.user?.id !== userId) throw new ErrorApi(req, res, 401, this.notValidMsg);

    //~ Update user
    userData = { id: user.id, ...userData };

    await this.updateOneItem(userData);

    //~ Send an email to confirm updates
    this.handleEmail(user.email, 'updated');

    return;
  };

  controlAllUsersRemovePwd = async () => {
    const users = await this.findAllItems();

    //~ Delete password display
    for (const user of users) {
      this.removePassword(user, 'password');
    }

    return users;
  };

  controlUserRemovePwd = async (userId: number) => {
    const user = await this.findOneItem(userId);

    //~ Delete password display
    this.removePassword(user, 'password');

    return user;
  };

  controlUserDetails = async (req: Request, res: Response) => {
    let { username, email, password, passwordConfirm }: IBodyData = req.body;

    //~ Email already exist ?
    const userExist = await this.checkUser(username, email);
    if (userExist) throw new ErrorApi(req, res, 401, this.userExist);

    //~ Encrypt password if password exist
    if (password) {
      if (password !== passwordConfirm) throw new ErrorApi(req, res, 401, this.passwordErrorMsg);

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      //replace password in body
      req.body.password = password;
    }

    return req.body;
  };

  //& Services Methods
  checkUser = async (username: string, email: string): Promise<IUserExist | null> => {
    const result = await UserData.findUserIdentity(username, email);
    if (!result) return null;

    return result;
  };

  isPasswordValid = async (user: IUserExist | null, password: string): Promise<boolean | null> => {
    const validPwd = await bcrypt.compare(password, user?.password!);
    return validPwd;
  };

  removePassword = async (data: IUserData, property: string) => {
    delete data[`${property}`];
  };

  generatedTokens = (userData: Object, req: Request) => {
    //~ Authorization JWT
    let accessToken = generateAccessToken(userData);
    let refreshToken = generateRefreshToken(userData, req);
    return { accessToken, refreshToken };
  };

  handleEmail = (email: string, context: string) => {
    return sendEmail.toUser(email, context);
  };
}

const User = new UserModel();
export { User };
