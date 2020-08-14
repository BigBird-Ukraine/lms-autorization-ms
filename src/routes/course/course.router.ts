import { Router } from 'express';

import { courseController } from '../../controllers';
import { checkAccessTokenMiddleware, isCourseFilterValid, isCoursePresent } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isCourseFilterValid, courseController.getCourses);
router.get('/my', courseController.getMyCourses);

router.use('/:course_id', isCoursePresent);
router.get('/:course_id', courseController.getCourseById);

export const courseRouter = router;
