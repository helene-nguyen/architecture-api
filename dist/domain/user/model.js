import debug from 'debug';
const logger = debug('Controller');
import { CoreModel } from '../core/coreModel.js';
import { ErrorApi } from '../../resources/services/errorHandling/errorHandler.js';
import { UserData } from './datamapper.js';
import { generateAccessToken, generateRefreshToken } from '../../resources/services/jsonWebToken.js';
import { sendEmail } from '../../resources/services/nodemailer/nodemailerAuto.js';
import bcrypt from 'bcrypt';
class UserModel extends CoreModel {
    data = UserData;
    passwordErrorMsg = `Not the same password.`;
    userExist = `Username or email already exists.`;
    userNotExist = `Username or email doesn't exist. Create an account to connect.`;
    controlSignUp = async (req, res) => {
        const user = await this.controlUserDetails(req, res);
        await sendEmail.toUser(user.email, 'subscribe');
        const result = await this.createOneItem(user);
        if (!result)
            return null;
    };
    controlSignIn = async (req, res) => {
        let { email, password } = req.body;
        const userExist = await this.checkUser('_', email);
        if (!userExist)
            throw new ErrorApi(req, res, 401, this.userNotExist);
        const passwordValid = this.isPasswordValid(userExist, password);
        if (!passwordValid)
            throw new ErrorApi(req, res, 401, this.notValidMsg);
        const { password: remove, ...user } = userExist;
        const { accessToken, refreshToken } = this.generatedTokens({ user }, req);
        const userIdentity = { ...user, accessToken, refreshToken };
        return userIdentity;
    };
    controlAllUsersRemovePwd = async () => {
        const users = await this.findAllItems();
        for (const user of users) {
            this.removePassword(user, 'password');
        }
        return users;
    };
    controlUserRemovePwd = async (id) => {
        const user = await this.findOneItem(id);
        this.removePassword(user, 'password');
        return user;
    };
    controlUserDetails = async (req, res) => {
        let { username, email, password, passwordConfirm } = req.body;
        const userExist = await this.checkUser(username, email);
        if (userExist)
            throw new ErrorApi(req, res, 401, this.userExist);
        if (password !== passwordConfirm)
            throw new ErrorApi(req, res, 401, this.passwordErrorMsg);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        return req.body;
    };
    checkUser = async (username, email) => {
        const result = await UserData.findUserIdentity(username, email);
        if (!result)
            return null;
        return result;
    };
    isPasswordValid = async (user, password) => {
        const validPwd = await bcrypt.compare(password, user?.password);
        return validPwd;
    };
    removePassword = async (data, property) => {
        delete data[`${property}`];
    };
    generatedTokens = (userData, req) => {
        let accessToken = generateAccessToken(userData);
        let refreshToken = generateRefreshToken(userData, req);
        return { accessToken, refreshToken };
    };
}
const User = new UserModel();
export { User };
//# sourceMappingURL=model.js.map