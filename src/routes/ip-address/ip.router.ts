import { Router } from 'express';

import { ipController } from '../../controllers/ip';
import { checkAccessTokenMiddleware, checkIsTeacher } from '../../middlewares/oauth';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsTeacher);

router.get('/', ipController.getIp);

export const ipRouter = router;
