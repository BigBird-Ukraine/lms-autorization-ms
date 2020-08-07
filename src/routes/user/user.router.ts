import { Router } from 'express';

import { userController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsEmailPresent,
  checkNumberOfUserPhoto,
  isUpdatedUserDataValid,
  isUserIdValid,
  isUserValid,
  photoCheckMiddleware
} from '../../middlewares';

const router = Router();

router.post('/', isUserValid, checkIsEmailPresent, photoCheckMiddleware, checkNumberOfUserPhoto, userController.createUser);

router.use(checkAccessTokenMiddleware);
router.get('/info', userController.getUserInfoByToken);

router.get('/my_passed_tests', userController.getMyPassedTests);

router.use('/:user_id', isUserIdValid, isUpdatedUserDataValid, checkAccessTokenMiddleware, photoCheckMiddleware, checkNumberOfUserPhoto);
router.patch('/:user_id', userController.updateUserByID);

export const userRouter = router;
