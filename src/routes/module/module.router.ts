import { Router } from 'express';

import { moduleController } from '../../controllers';
import { checkAccessTokenMiddleware, isModuleFilterValid, isModulePresent } from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', isModuleFilterValid, moduleController.getModules);

router.use('/:module_id', isModulePresent);
router.get('/:module_id', moduleController.getModuleById);

export const moduleRouter = router;
