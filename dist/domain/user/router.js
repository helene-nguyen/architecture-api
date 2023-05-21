import { Router } from 'express';
const router = Router();
import { user } from './controller.js';
router.post('/api/v1/signup', user.doSignUp);
router.post('/api/v1/signin', user.doSignIn);
router.get('/api/v1/users', user.fetchAllUsers);
router.get('/api/v1/users/:userId(\\d+)', user.fetchOneUser);
router.patch('/api/v1/users/:userId(\\d+)', user.updateUser);
export { router };
//# sourceMappingURL=router.js.map