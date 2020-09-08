import { Router } from 'express';

import { authController } from '../../controllers';
import {
  checkIsPasswordCorrect,
  checkIsUserBlocked,
  checkIsUserPending,
  checkIsUserRegistered,
  checkRefreshTokenMiddleware, checkResetPasswordTokenMiddleware, isPasswordValid
} from '../../middlewares';

const router = Router();

router.post('/logout', authController.logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware , authController.refreshToken);

router.post('/reset_password/:token', checkResetPasswordTokenMiddleware, isPasswordValid, authController.resetPassword);

router.use(checkIsUserRegistered, checkIsUserBlocked, checkIsUserPending);
router.post('/', checkIsPasswordCorrect, authController.loginUser);

router.post('/forgot_password', authController.forgotPassword);

export const authRouter = router;
