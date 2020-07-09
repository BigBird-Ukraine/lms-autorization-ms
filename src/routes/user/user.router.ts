import { Router } from 'express';

import { userController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsEmailPresent, checkNumberOfUserPhoto, photoCheckMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkIsEmailPresent, photoCheckMiddleware, checkNumberOfUserPhoto, userController.createUser);
router.get('/info', checkAccessTokenMiddleware, userController.getUserInfoByToken);
router.patch('/:user_id', checkAccessTokenMiddleware, photoCheckMiddleware, checkNumberOfUserPhoto, userController.updateUserByID);

export const userRouter = router;
