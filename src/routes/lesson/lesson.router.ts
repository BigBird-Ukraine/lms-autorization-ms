import { Router } from 'express';

import { lessonController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsTeacher, isLessonOwnerMiddleware, isLessonPresentMiddleware } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', lessonController.getLesson);

router.use(checkIsTeacher);
router.post('/', lessonController.createLesson);
router.get('/my', lessonController.getMyLesson);

router.use(isLessonPresentMiddleware);
router.use(isLessonOwnerMiddleware);

router.patch('/:lesson_id', lessonController.updateMyLesson);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
