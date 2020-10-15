import { NextFunction, Response } from 'express';
import { ObjectID } from 'mongodb';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom } from '../../interfaces';
import { roomService } from '../../services';

export function isRoomPresentMiddlewareWrapper(groupStatus: boolean) {
    return async (req: IRequestExtended, res: Response, next: NextFunction) => {
        try {
            const {room_id} = req.params;
            let room: IRoom[];

            if (!ObjectID.isValid(room_id)) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.BAD_REQUEST_WRONG_PARAMS.message,
                    errors.BAD_REQUEST_WRONG_PARAMS.code
                ));
            }
            groupStatus ? room = await roomService.findRoomsWithBookingTable(room_id) :
                room = await roomService.findRooms({_id: room_id});

            if (!room[0]) {
                return next(new ErrorHandler(
                    ResponseStatusCodesEnum.NOT_FOUND,
                    errors.NOT_FOUND_ROOM_NOT_PRESENT.message,
                    errors.NOT_FOUND_ROOM_NOT_PRESENT.code));
            }

            req.room = room[0];
            next();
        } catch (e) {
            next(e);
        }
    };
}
