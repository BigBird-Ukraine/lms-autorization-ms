import { Router } from 'express';

import { questionController } from '../../controllers';
import { checkAccessTokenMiddleware, isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
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
