import { Router } from 'express';

import { groupController } from '../../controllers';
import { checkAccessTokenMiddleware, checkIsTeacher, isGroupPresent } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', groupController.getAllGroups);

router.use('/:group_id', isGroupPresent);
router.get('/:group_id', groupController.getGroupById);
router.get('/:group_id/students', groupController.getStudentsList);

router.use('/:group_id', checkIsTeacher);
router.post('/:group_id/attendance', groupController.addNewVisitLog);
router.get('/:group_id/attendance', groupController.getVisitLog);

export const groupRouter = router;
