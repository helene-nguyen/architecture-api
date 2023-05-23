//~ Import Router
import { Router } from 'express';
const router = Router();

import { user } from './controller.js';
import { userSchema, userUpdateSchema } from './schema.js';
import { validate } from '../../middlewares/validateSchema.js';

import { validateToken } from '../../middlewares/validateToken.js';
import { getRefreshToken } from '../../middlewares/getRefreshToken.js';
import { refreshToken } from '../../resources/services/jsonWebToken.js';
import { auth, admin } from '../../middlewares/auth.js';

//~ Routes
router.post('/api/v1/signup', validate(userSchema), user.doSignUp);
router.post('/api/v1/signin', user.doSignIn);
router.get('/api/v1/signout', [getRefreshToken], user.doSignOut);

router.get('/api/v1/users', [validateToken, auth, admin], user.fetchAllUsers);
router.get('/api/v1/users/:userId(\\d+)', [validateToken, auth], user.fetchOneUser);
router.patch('/api/v1/users/:userId(\\d+)', validate(userUpdateSchema), [validateToken, auth], user.updateUser);
router.delete('/api/v1/users/:userId(\\d+)', [validateToken, auth], user.deleteUser);

router.post('/api/v1/refreshToken', [getRefreshToken], refreshToken);

//~ Export router
export { router };
