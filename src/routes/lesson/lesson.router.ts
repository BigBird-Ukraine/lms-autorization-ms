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

router.post('/', checkIsTeacher, lessonController.createLesson);
router.get('/my', checkIsTeacher, lessonController.getMyLesson);

router.use('/:lesson_id', isLessonPresentMiddleware);
router.get('/:lesson_id', lessonController.getLessonById);
router.get('/:lesson_id/test', lessonController.generateTestByLessonId);
router.post('/:lesson_id/test', checkPassedTestData, userController.addTestResult);

router.use('/:lesson_id', isLessonOwnerMiddleware);
router.patch('/:lesson_id', lessonController.updateMyLesson);
router.patch('/:lesson_id/question', checkQuestionsListLenght, isQuestionExistInLessonMiddleware, lessonController.addQuestionToLesson);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
