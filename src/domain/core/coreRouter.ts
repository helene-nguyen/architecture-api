import { Router } from 'express';
const router = Router();

//~ Main
import { router as mainRouter } from '../main/router.js';
router.use(mainRouter);

//~ Export all routes
export { router };
