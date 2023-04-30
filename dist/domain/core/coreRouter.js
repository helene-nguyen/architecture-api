import { Router } from 'express';
const router = Router();
import { router as mainRouter } from './main.js';
router.use(mainRouter);
import { router as userRouter } from './user.js';
router.use(userRouter);
import { router as projectRouter } from './project.js';
router.use(projectRouter);
import { router as articleRouter } from './article.js';
router.use(articleRouter);
import { router as categoryRouter } from './category.js';
router.use(categoryRouter);
import { router as goldenBookTicketRouter } from './goldenBookTicket.js';
router.use(goldenBookTicketRouter);
export { router };
//# sourceMappingURL=coreRouter.js.map