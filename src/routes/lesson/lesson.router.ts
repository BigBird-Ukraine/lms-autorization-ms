import { Router } from 'express';

import { lessonController, userController } from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsTeacher, checkPassedTestData,
  checkQuestionsListLenght,
  isLessonOwnerMiddleware,
  isLessonPresentMiddleware,
  isQuestionExistInLessonMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', lessonController.getLesson);
router.get('/:lesson_id/test', lessonController.generateTestByLessonId);
router.post('/:lesson_id/test', checkPassedTestData, userController.addTestResult);
router.get('/:lesson_id', isLessonPresentMiddleware, lessonController.getLessonById);

router.use(checkIsTeacher);
router.post('/', lessonController.createLesson);
router.get('/my', lessonController.getMyLesson);

router.use('./:lesson_id', isLessonPresentMiddleware, isLessonOwnerMiddleware);
router.patch('/:lesson_id', lessonController.updateMyLesson);
router.patch('/:lesson_id/question', checkQuestionsListLenght, isQuestionExistInLessonMiddleware, lessonController.addQuestionToLesson);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
