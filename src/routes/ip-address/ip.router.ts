import { Router } from 'express';

import { apiController } from '../../controllers/ip';
import { checkAccessTokenMiddleware, checkIsTeacher } from '../../middlewares/oauth';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsTeacher);

router.get('/', apiController.getIp);

export const ipRouter = router;
