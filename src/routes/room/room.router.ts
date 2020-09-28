import { Router } from 'express';

import { roomController } from '../../controllers';
import {
    checkAccessTokenMiddleware,
    checkDateAndUsersPresentMiddleware,
    checkIsTeacher,
    isBookTableDataValid,
    isDateValid, isRentOwner,
    isRoomOccupiedMiddleware,
    isRoomOwnerMiddleware,
    isRoomPresentMiddlewareWrapper,
    isRoomUpdatedDataValid,
    isRoomValid, isTableOccupiedMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', roomController.getRooms);

router.get('/setting', checkIsTeacher, roomController.getSettingRooms);
router.get('/my', checkIsTeacher, roomController.getMyRooms);

router.get('/:room_id', isRoomPresentMiddlewareWrapper(false), roomController.getSingleRoom);
router.post('/:room_id/:table_number',
    isBookTableDataValid,
    isRoomPresentMiddlewareWrapper(false),
    isTableOccupiedMiddleware,
    roomController.bookTable);
router.get('/:room_id/:table_number', isRoomPresentMiddlewareWrapper(true), roomController.getBookTable);
router.delete('/:room_id/:rent_id', isRoomPresentMiddlewareWrapper(false), isRentOwner, roomController.deleteBookedUser);

router.use(checkIsTeacher);
router.post('/', isRoomValid, isDateValid, isRoomOccupiedMiddleware, roomController.createRoom);
router.use('/:room_id', isRoomPresentMiddlewareWrapper(false));
router.put('/:room_id', isRoomOwnerMiddleware, isRoomUpdatedDataValid, checkDateAndUsersPresentMiddleware, roomController.updateRoom);
router.delete('/:room_id', isRoomOwnerMiddleware, roomController.deleteRoom);

export const roomRouter = router;
