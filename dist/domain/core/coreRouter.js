import { Router } from 'express';
const router = Router();
import { router as mainRouter } from '../main/router.js';
router.use(mainRouter);
import { router as userRouter } from '../user/router.js';
router.use(userRouter);
export { router };
//# sourceMappingURL=coreRouter.js.map