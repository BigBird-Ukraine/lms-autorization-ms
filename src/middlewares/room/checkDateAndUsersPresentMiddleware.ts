import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom } from '../../interfaces';

export const checkDateAndUsersPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const lastVersionRoom = req.room as IRoom;

    if (lastVersionRoom.booked_users.length) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.FORBIDDEN,
            errors.FORBIDDEN_ROOM_HAS_USERS.message,
            errors.FORBIDDEN_ROOM_HAS_USERS.code));
    }

    next();
};
