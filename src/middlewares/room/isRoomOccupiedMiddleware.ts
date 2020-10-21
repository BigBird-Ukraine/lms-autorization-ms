import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { getYesterday } from '../../helpers';
import { IRequestExtended, IRoom } from '../../interfaces';
import { roomService } from '../../services';

export const isRoomOccupiedMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {label, ip_address, start_at, close_at} = req.body as IRoom;

    const yesterday = getYesterday(start_at);

    const roomByParams = {
        label,
        ip_address,
        start_at: {
            $lte: new Date(close_at),
            $gte: yesterday
        }
    };

    const rooms = await roomService.findRooms(roomByParams) as IRoom[];

    if (rooms.length) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_ROOM_ALREADY_EXIST.message,
            errors.BAD_REQUEST_ROOM_ALREADY_EXIST.code));
    }

    next();
};
