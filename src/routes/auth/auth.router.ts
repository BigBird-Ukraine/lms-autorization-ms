import { Router } from 'express';

import { authController } from '../../controllers';

const router = Router();

// todo checkIsUserPresentMiddleware
router.post('/', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh', authController.refreshToken);

export const authRouter = router;
