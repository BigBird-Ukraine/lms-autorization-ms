import { Router } from 'express';

import { questionController } from '../../controllers';
import {
    checkAccessTokenMiddleware,
    checkIsTeacher,
    isQuestionFilterValid,
    isQuestionPresentMiddleware, isQuestionValid,
    isUserQuestionOwnerMiddleware
} from '../../middlewares';
import { isQuestionIdValid } from '../../middlewares/question/validators/isQuestionIdValid.middleware';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isQuestionFilterValid, questionController.getQuestions);

router.use(checkIsTeacher);
router.get('/my', questionController.getMyQuestions);
router.post('/', isQuestionValid, questionController.createQuestion);

router.use('/:question_id', isQuestionPresentMiddleware, isUserQuestionOwnerMiddleware);
router.delete('/:question_id', isQuestionIdValid, questionController.deleteQuestion);

export const questionRouter = router;
