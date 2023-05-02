import { Router } from 'express';
const router = Router();
import { renderHomePage } from './controller.js';
router.get('/', renderHomePage);
export { router };
//# sourceMappingURL=router.js.map