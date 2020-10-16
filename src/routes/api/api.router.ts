import { Router } from 'express';

import { authRouter } from '../auth';
import { courseRouter } from '../course';
import { downloadRouter } from '../download';
import { groupRouter } from '../group';
import { helperRouter } from '../helper';
import { ipRouter } from '../ip-address';
import { lessonRouter } from '../lesson';
import { moduleRouter } from '../module';
import { questionRouter } from '../question';
import { roomRouter } from '../room';
import { userRouter } from '../user';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);
router.use('/helpers', helperRouter);
router.use('/downloads', downloadRouter);
router.use('/questions', questionRouter);
router.use('/lessons', lessonRouter);
router.use('/courses', courseRouter);
router.use('/modules' , moduleRouter);
router.use('/groups', groupRouter);
router.use('/rooms', roomRouter);
router.use('/ips', ipRouter);

export const apiRouter = router;
