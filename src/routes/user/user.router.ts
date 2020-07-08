import { Router } from 'express';

import { userController } from '../../controllers';
import {
    checkAccessTokenMiddleware,
    checkIsEmailPresent,
    checkNumberOfUserPhoto,
    isUserValid,
    photoCheckMiddleware
} from '../../middlewares';
import { isUpdatedUserDataValid } from '../../middlewares/user/validatos/isUpdatedUserDataValid.middleware';
import { isUserIdValid } from '../../middlewares/user/validatos/isUserIdValid.middleware';

const router = Router();

router.post('/', isUserValid, checkIsEmailPresent, photoCheckMiddleware, checkNumberOfUserPhoto, userController.createUser);
router.get('/info', checkAccessTokenMiddleware, userController.getUserInfoByToken);

router.use('/:user_id', isUserIdValid, isUpdatedUserDataValid, checkAccessTokenMiddleware, photoCheckMiddleware, checkNumberOfUserPhoto);
router.patch('/:user_id', userController.updateUserByID);

export const userRouter = router;
