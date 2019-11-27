import { Router } from 'express';

import { userController } from '../../controllers';
import {checkIsEmailPresent} from "../../middlewares";

const router = Router();

router.post('/', checkIsEmailPresent, userController.createUser);

export const userRouter = router;
