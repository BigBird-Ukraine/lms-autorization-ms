import { Router } from 'express';
import { downloadController } from '../../controllers';

const router = Router();

router.get('/logs', downloadController.ErrorLogFileDownload);

export const downloadRouter = router;
