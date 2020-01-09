import { Router } from 'express';

import { questionController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsTeacher, isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', questionController.getQuestions);

router.use(checkIsTeacher);
router.get('/my', questionController.getMyQuestions);
router.post('/', questionController.createQuestion);

router.use('./:question_id', isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware);
router.delete('/:question_id', questionController.deleteQuestion);

export const questionRouter = router;
