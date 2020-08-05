import { Router } from 'express';

import { questionController } from '../../controllers';

import {
  checkAccessTokenMiddleware, checkIsTeacher, isQuestionFilterValid,
  isQuestionPresentMiddleware, isQuestionValid, isUpdatedQuestionValid,
  isUserAdminOrTeacherMiddleware, isUserQuestionOwnerMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isQuestionFilterValid, questionController.getQuestions);

router.use(checkIsTeacher);
router.get('/my', questionController.getMyQuestions);
router.post('/', isQuestionValid, isUserAdminOrTeacherMiddleware, questionController.createQuestion);
router.put('/', isUpdatedQuestionValid, questionController.updateQuestion);

router.use('/:question_id', isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware);
router.delete('/:question_id', questionController.deleteQuestion);

export const questionRouter = router;
