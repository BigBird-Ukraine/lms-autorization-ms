import { Router } from 'express';

import { authController } from '../../controllers';

const router = Router();

// todo checkIsUserPresentMiddleware
router.post('/', authController.loginUser);

export const authRouter = router;
