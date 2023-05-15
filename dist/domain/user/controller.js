import debug from 'debug';
const logger = debug('Controller');
import { CoreController } from '../core/coreController.js';
import { User } from './model.js';
class UserController extends CoreController {
    model = User;
}
const user = new UserController();
export { user };
//# sourceMappingURL=controller.js.map