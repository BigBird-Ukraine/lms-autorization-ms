import { Router } from 'express';

import { questionController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsTeacher, isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsTeacher);

router.get('/', questionController.getQuestions);
router.get('/my', questionController.getMyQuestions);
router.post('/', questionController.createQuestion);
router.delete(
  '/:question_id',
  isQuestionPresentMiddleware,
  isUserQuestionOwnerMiddleware,
  questionController.deleteQuestion
);

export const questionRouter = router;
