import { Router } from 'express';

import { lessonController, userController } from '../../controllers';
import {
    checkAccessTokenMiddleware,
    checkIsTeacher, checkPassedTestData,
    checkQuestionsListLenght, isLessonFilterValid,
    isLessonOwnerMiddleware, isLessonPassedTestDataValid,
    isLessonPresentMiddleware, isLessonQuestionValid, isLessonUpdatingDataValid, isLessonValid,
    isQuestionExistInLessonMiddleware
} from '../../middlewares';
import { isLessonIdValid } from '../../middlewares/lesson/validators/isLessonIdValid.middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isLessonFilterValid, lessonController.getLessons);

router.post('/', isLessonValid, checkIsTeacher, lessonController.createLesson);
router.get('/my', checkIsTeacher, lessonController.getMyLesson);

router.use('/:lesson_id', isLessonIdValid, isLessonPresentMiddleware);
router.get('/:lesson_id', lessonController.getLessonById);
router.get('/:lesson_id/test', lessonController.generateTestByLessonId);
router.post('/:lesson_id/test', isLessonPassedTestDataValid, checkPassedTestData, userController.addTestResult);

router.use('/:lesson_id', isLessonOwnerMiddleware);
router.patch('/:lesson_id', isLessonIdValid, isLessonUpdatingDataValid, lessonController.updateMyLesson);
router.patch('/:lesson_id/question', isLessonQuestionValid, checkQuestionsListLenght, isQuestionExistInLessonMiddleware,
    lessonController.addQuestionToLesson);
router.delete('/:lesson_id', lessonController.deleteMyLesson);

export const lessonRouter = router;
