//~ Import Router
import { Router } from 'express';
const router = Router();

import { user } from './controller.js';

router.post('/api/v1/signup', user.doSignUp);
router.get('/api/v1/users', user.fetchAllUsers);
router.get('/api/v1/users/:userId(\\d+)', user.fetchOneUser);

//~ Export router
export { router };
