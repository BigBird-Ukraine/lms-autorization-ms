import { Router } from 'express';

import { roomController } from '../../controllers';

import { HardWordsEnum } from '../../constants/enums';
import {
    checkAccessTokenMiddleware,
    checkDateAndUsersPresentMiddleware,
    checkIsTeacher, checkUserLocationMiddleware,
    isConfirmDataValidMiddleware,
    isDateValidWrapper,
    isRoomOccupiedMiddleware,
    isRoomOwnerMiddleware,
    isRoomPresentMiddlewareWrapper,
    isRoomUpdatedDataValid,
    isRoomValid
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware);
router.get('/', roomController.getRooms);
router.get('/my_booking', roomController.getMyBooking);

router.get('/setting', checkIsTeacher, roomController.getSettingRooms);
router.get('/my', checkIsTeacher, roomController.getMyRooms);

router.get('/:room_id', isRoomPresentMiddlewareWrapper(false), roomController.getSingleRoom);
router.get('/:room_id/:table_number', isRoomPresentMiddlewareWrapper(true), roomController.getBookTable);
router.patch('/:room_id/:table_number',
    isConfirmDataValidMiddleware,
    isRoomPresentMiddlewareWrapper(false),
    checkUserLocationMiddleware,
    isDateValidWrapper(HardWordsEnum.UPDATE_CONFIRM_STATUS),
    roomController.updateConfirmStatus);

router.use(checkIsTeacher);
router.post('/', isRoomValid, isDateValidWrapper(HardWordsEnum.CREATE_ROOM), isRoomOccupiedMiddleware, roomController.createRoom);
router.use('/:room_id', isRoomPresentMiddlewareWrapper(false));
router.put('/:room_id', isRoomOwnerMiddleware, isRoomUpdatedDataValid, checkDateAndUsersPresentMiddleware, roomController.updateRoom);
router.delete('/:room_id', isRoomOwnerMiddleware, roomController.deleteRoom);

export const roomRouter = router;
