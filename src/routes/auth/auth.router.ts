import { Router } from 'express';

import { authController } from '../../controllers';
import { checkIsPasswordCorrect, checkIsUserRegistered, checkRefreshTokenMiddleware } from '../../middlewares';

const router = Router();

router.post('/', checkIsUserRegistered, checkIsPasswordCorrect, authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware , authController.refreshToken);

export const authRouter = router;
