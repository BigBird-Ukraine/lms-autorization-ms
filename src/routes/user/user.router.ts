import { Router } from 'express';

import { userController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsEmailPresent } from '../../middlewares';

const router = Router();

router.post('/', checkIsEmailPresent, userController.createUser);
router.get('/info', checkAccessTokenMiddleware, userController.getUserInfoByToken);

export const userRouter = router;
