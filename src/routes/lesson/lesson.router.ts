import { Router } from 'express';

import { lessonController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsTeacher } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.use(checkIsTeacher);

router.post('/', lessonController.createLesson);
router.get('/', lessonController.getLesson);
router.get('/my', lessonController.getMyLesson);

export const lessonRouter = router;
