import { Router } from 'express';

import { roomController } from '../../controllers';

import { RouterActionsEnum } from '../../constants/enums';
import {
    checkAccessTokenMiddleware,
    checkIsTeacher,
    checkUserLocationMiddleware,
    checkUsersPresentMiddleware,
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

router.get('/:room_id', isRoomPresentMiddlewareWrapper(null), roomController.getSingleRoom);
router.get('/:room_id/:table_number',
    isRoomPresentMiddlewareWrapper(RouterActionsEnum.FIND_ROOM_WITH_BOOKING_TABLE),
    roomController.getBookTable);

router.patch('/:room_id/:table_number',
    isConfirmDataValidMiddleware,
    isRoomPresentMiddlewareWrapper(RouterActionsEnum.FIND_ROOM_WITH_IP_ADDRESS),
    checkUserLocationMiddleware,
    isDateValidWrapper(RouterActionsEnum.UPDATE_CONFIRM_STATUS),
    roomController.updateConfirmStatus);

router.use(checkIsTeacher);
router.post('/', isRoomValid, isDateValidWrapper(RouterActionsEnum.CREATE_ROOM), isRoomOccupiedMiddleware, roomController.createRoom);
router.use('/:room_id', isRoomPresentMiddlewareWrapper(null));
router.put('/:room_id', isRoomOwnerMiddleware, isRoomUpdatedDataValid, checkUsersPresentMiddleware, roomController.updateRoom);
router.delete('/:room_id', isRoomOwnerMiddleware, roomController.deleteRoom);

export const roomRouter = router;
