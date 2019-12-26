import { Router } from 'express';

import { userController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsEmailPresent , photoCheckMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkIsEmailPresent, photoCheckMiddleware, userController.createUser);
router.get('/info', checkAccessTokenMiddleware, userController.getUserInfoByToken);

export const userRouter = router;
