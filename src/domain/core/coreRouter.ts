import { Router } from 'express';
const router = Router();

//~ Main
import { router as mainRouter } from '../main/router.js';
router.use(mainRouter);

//~ Main
import { router as userRouter } from '../user/router.js';
router.use(userRouter);

//~ Export all routes
export { router };
