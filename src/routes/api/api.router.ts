import { Router } from 'express';

import { authRouter } from '../auth';
import { courseRouter } from '../course';
import { downloadRouter } from '../download';
import { helperRouter } from '../helper';
import { lessonRouter } from '../lesson';
import { moduleRouter } from '../module';
import { questionRouter } from '../question';
import { userRouter } from '../user';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);
router.use('/helpers', helperRouter);
router.use('/downloads', downloadRouter);
router.use('/questions', questionRouter);
router.use('/lessons', lessonRouter);
router.use('/courses', courseRouter);
router.use('/module' , moduleRouter);

export const apiRouter = router;
