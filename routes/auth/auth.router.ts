import { Router } from 'express';

import { authController } from '../../controllers';
import { checkIsPasswordCorrect, checkIsUserBlocked, checkIsUserRegistered, checkRefreshTokenMiddleware } from '../../middlewares';

const router = Router();

router.post('/logout', authController.logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware , authController.refreshToken);

router.use(checkIsUserRegistered, checkIsUserBlocked);
router.post('/', checkIsPasswordCorrect, authController.loginUser);

export const authRouter = router;
