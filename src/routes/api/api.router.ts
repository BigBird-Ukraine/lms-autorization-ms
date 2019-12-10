import { Router } from 'express';

import { authRouter } from '../auth';
import { downloadRouter } from '../download';
import { helperRouter } from '../helper';
import { questionRouter } from '../question';
import { userRouter } from '../user';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/questions', questionRouter);
router.use('/helpers', helperRouter);
router.use('/downloads', downloadRouter);

export const apiRouter = router;
