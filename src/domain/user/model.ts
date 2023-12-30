//~ Import modules
import { Request, Response } from 'express';
import { CoreModel } from '../core/coreModel.js';
import { UserData } from './repository.js';
import { IBodyData, IUserData, IUserExist } from './Types.js';
import { sendEmail } from '../../resources/services/nodemailer/nodemailerAuto.js';
import { ErrorApi } from '../../resources/services/errorHandling/errorHandler.js';
//~ Security
import { generateAccessToken, generateRefreshToken } from '../../resources/services/jsonWebToken.js';
import bcrypt from 'bcrypt';
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

    //~ Create user
    await this.createOneItem(user);

    //~ Send an email to confirm creation
    this.handleEmail(user.email, 'subscribe');

    return;
  };

  controlSignIn = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    //~ User exist?
    const userExist: IUserExist | null = await this.checkUser('_', email);
    if (!userExist) throw new ErrorApi(req, res, 401, this.userNotExist);

    //~ Security
    const passwordValid = await this.isPasswordValid(userExist, password);
    if (!passwordValid) throw new ErrorApi(req, res, 401, this.notValidMsg);

    const { password: remove, ...user } = userExist!;

    // The ! non-null assertion operator is used to tell TypeScript that userExist is guaranteed to be non-null at this point, so the destructuring assignment will work correctly
    const { accessToken, refreshToken } = this.generatedTokens({ user }, req);

    const userIdentity = { ...user, tokens: { accessToken, refreshToken } };

    return userIdentity;
  };

  controlUpdatedUserDetails = async (req: Request, res: Response, userId: number) => {
    let userData = await this.controlUserDetails(req, res);
    const user = await this.findOneItem(userId);

    if (!user || req.user?.id !== userId) throw new ErrorApi(req, res, 401, this.notValidMsg);

    //~ Update user
    userData = { id: user.id, ...userData };

    await this.updateOneItem(userData);

    //~ Send an email to confirm updates
    this.handleEmail(user.email, 'updated');

    return;
  };

  controlDeletedUserDetails = async (req: Request, res: Response, userId: number) => {
    const user = await this.findOneItem(userId);
    // User must be connected to delete account
    if (req.user?.role === 'admin' || req.user?.id !== userId) throw new ErrorApi(req, res, 403, this.badRequestMsg);

    //~ Delete user
    await this.deleteOneItem(user.id);

    //~ Clean user session
    req.user = null;
    req.session.destroy();

    //~ Send an email to confirm updates
    this.handleEmail(user.email, 'unsubscribe');

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

  allUsers = async () => {
    const users = await this.data.mongoData.selectAll();

    return users;
  };
}

const User = new UserModel();
export { User };
