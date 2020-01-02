import { Router } from 'express';

import { lessonController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsTeacher, isLessonOwnerMiddleware, isLessonPresentMiddleware } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsTeacher);

router.post('/', lessonController.createLesson);
router.get('/', lessonController.getLesson);
router.get('/my', lessonController.getMyLesson);
router.patch('/:lesson_id', isLessonPresentMiddleware, isLessonOwnerMiddleware, lessonController.updateMyLesson);
router.patch('/:lesson_id/question', isLessonPresentMiddleware, isLessonOwnerMiddleware,  lessonController.addQuestionToLesson);
router.delete('/:lesson_id', isLessonPresentMiddleware, isLessonOwnerMiddleware, lessonController.deleteMyLesson);

export const lessonRouter = router;
