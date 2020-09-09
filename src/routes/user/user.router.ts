import { Router } from 'express';

import { userController } from '../../controllers';
import {
  checkAccessTokenMiddleware, checkChangedPasswordTokenPresent, checkConfirmMailTokenPresent,
  checkIsEmailPresent, checkIsPasswordCorrect,
  checkNumberOfUserPhoto, isChangePasswordDataValid, isConfirmDataValid,
  isUpdatedUserDataValid,
  isUserIdValid,
  isUserValid,
  photoCheckMiddleware
} from '../../middlewares';

const router = Router();

router.post('/', isUserValid, checkIsEmailPresent, photoCheckMiddleware, checkNumberOfUserPhoto, userController.createUser);

router.patch('/confirm/mail', isConfirmDataValid, checkConfirmMailTokenPresent, userController.confirmUserMail);

router.use(checkAccessTokenMiddleware);
router.get('/info', userController.getUserInfoByToken);

router.get('/my_passed_tests', userController.getMyPassedTests);
router.get('/my-groups', userController.getMyGroups);

router.post('/password', isChangePasswordDataValid, checkIsPasswordCorrect,  userController.confirmPassword);
router.put('/password', isConfirmDataValid, checkChangedPasswordTokenPresent,  userController.changePassword);

router.use('/:user_id', checkAccessTokenMiddleware, isUserIdValid,  isUpdatedUserDataValid, photoCheckMiddleware, checkNumberOfUserPhoto);
router.patch('/:user_id', userController.updateUserByID);

export const userRouter = router;
