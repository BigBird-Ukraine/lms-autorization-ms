import { Router } from 'express';

import { authRouter } from '../auth';
import { downloadRouter } from '../download';
import { helperRouter } from '../helper';
import { lessonRouter } from '../lesson';
import { questionRouter } from '../question';
import { userRouter } from '../user';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);
router.use('/helpers', helperRouter);
router.use('/downloads', downloadRouter);
router.use('/questions', questionRouter);
router.use('/lessons', lessonRouter);

export const apiRouter = router;
