import debug from 'debug';
const logger = debug('Controller');
import { CoreController } from '../core/coreController.js';
import { User } from './model.js';
class UserController extends CoreController {
    model = User;
    paramsId = 'userId';
    doSignUp = async (req, res) => {
        try {
            await User.controlSignUp(req, res);
            return res.status(201).json(this.createSuccessful);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    doSignIn = async (req, res) => {
        try {
            const userIdentity = await User.controlSignIn(req, res);
            return res.status(200).json(userIdentity);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    doSignOut = async (req, res) => { };
    fetchAllUsers = async (req, res) => {
        try {
            const users = await User.controlAllUsersRemovePwd();
            return res.status(200).json(users);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    fetchOneUser = async (req, res) => {
        try {
            const id = +req.params[this.paramsId];
            const user = await User.controlUserRemovePwd(id);
            return res.status(200).json(user);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    updateUser = async (req, res) => { };
    deleteUser = async (req, res) => { };
}
const user = new UserController();
export { user };
//# sourceMappingURL=controller.js.map