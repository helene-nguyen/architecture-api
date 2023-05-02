import { Router } from 'express';
const router = Router();
import { router as mainRouter } from '../main/router.js';
router.use(mainRouter);
export { router };
//# sourceMappingURL=coreRouter.js.map