import { Router } from 'express';

import { groupController } from '../../controllers';
import { checkAccessTokenMiddleware , isGroupPresent } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', groupController.getAllGroups);

router.use('/:group_id', isGroupPresent);
router.get('/:group_id', groupController.getGroupById);
router.get('/:group_id/students', groupController.getStudentsList);
router.post('/:group_id/attendance', groupController.addNewVisitLog);

export const groupRouter = router;
