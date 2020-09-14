import { Router } from 'express';

import { roomController } from '../../controllers';
import {
  checkAccessTokenMiddleware, checkDateAndUsersPresentMiddleware,
  checkIsTeacher, isRoomOccupiedMiddleware, isRoomOwnerMiddleware,
  isRoomPresentMiddleware, isRoomUpdatedDataValid, isRoomValid
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', roomController.getRooms);

router.use(checkIsTeacher);
router.post('/', isRoomValid, isRoomOccupiedMiddleware, roomController.createRoom);

router.get('/my', roomController.getMyRooms);

router.use('/:room_id', isRoomPresentMiddleware, isRoomOwnerMiddleware);
router.put('/:room_id', isRoomUpdatedDataValid, checkDateAndUsersPresentMiddleware, roomController.updateRoom);
router.delete('/:room_id', roomController.deleteRoom);

export const roomRouter = router;
