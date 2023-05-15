//~ Import Router
import { Router } from 'express';
const router = Router();

import { user } from './controller.js';

router.get('/api/v1/users', user.fetchAll);

//~ Export router
export { router };
