import { Router } from 'express';

import { authController } from '../../controllers';
import { checkIsPasswordCorrect, checkIsUserRegistered } from '../../middlewares';

const router = Router();

// todo checkIsUserPresentMiddleware
router.post('/', checkIsUserRegistered, checkIsPasswordCorrect, authController.loginUser);
router.post('/logout', authController.logoutUser);
// router.post('/refresh', authController.refreshToken);

export const authRouter = router;
