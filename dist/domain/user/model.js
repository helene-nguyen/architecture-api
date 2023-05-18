import debug from 'debug';
const logger = debug('Controller');
import { CoreModel } from '../core/coreModel.js';
import { ErrorApi } from '../../resources/services/errorHandling/errorHandler.js';
import { UserData } from './datamapper.js';
import bcrypt from 'bcrypt';
class UserModel extends CoreModel {
    data = UserData;
    passwordErrorMsg = `Not the same password.`;
    userExist = `Username or email already exists.`;
    controlSignUp = async (req, res) => {
        let { username, email, password, passwordConfirm } = req.body;
        const userExist = await this.checkUser(username, email);
        if (userExist)
            throw new ErrorApi(req, res, 401, this.userExist);
        if (password !== passwordConfirm)
            throw new ErrorApi(req, res, 401, this.passwordErrorMsg);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        const result = await this.createOneItem(req.body);
        if (!result)
            return null;
    };
    controlAllUsersDetails = async () => {
        const users = await this.findAllItems();
        for (const user of users) {
            this.removePassword(user, 'password');
        }
        return users;
    };
    controlUserDetails = async (id) => {
        const user = await this.findOneItem(id);
        this.removePassword(user, 'password');
        return user;
    };
    checkUser = async (username, email) => {
        const result = await UserData.findUserIdentity(username, email);
        if (!result)
            return null;
        return result;
    };
    removePassword = async (data, property) => {
        delete data[`${property}`];
    };
}
const User = new UserModel();
export { User };
//# sourceMappingURL=model.js.map