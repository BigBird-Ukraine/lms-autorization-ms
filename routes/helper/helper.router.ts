import { Router } from 'express';

import { helperController } from '../../controllers';

const router = Router();

router.get('/tags', helperController.getTags);
router.get('/levels', helperController.getLevels);
router.get('/subjects', helperController.getSubjects);
router.get('/groups', helperController.getGroups);

export const helperRouter = router;
