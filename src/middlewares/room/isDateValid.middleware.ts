import { NextFunction, Response } from 'express';
import * as moment from 'moment';

import { RegExpEnum, ResponseStatusCodesEnum, RouterActionsEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IBookUser, IRequestExtended, IRoom } from '../../interfaces';

export function isDateValidWrapper(type: string) {
    return async (req: IRequestExtended, res: Response, next: NextFunction) => {
        const {start_at, close_at, _id} = req.body as Partial<IRoom>;
        const room = req.room as IRoom;

        let condition;
        const currentAt = new Date(moment().format(RegExpEnum.date_format)).getTime();

        switch (type) {
            case RouterActionsEnum.CREATE_ROOM:
                const startAt = new Date(start_at as Date).getTime();
                const closeAt = new Date(close_at as Date).getTime();

                condition = currentAt > startAt || closeAt <= startAt;
                break;
            case RouterActionsEnum.UPDATE_CONFIRM_STATUS:
                const {rent_start, rent_end} = room.booked_users.find(bu => bu._id?.toString() === _id) as IBookUser;

                condition = currentAt < new Date(rent_start).getTime() || currentAt > new Date(rent_end).getTime();
                break;
            default:
                condition = true;
        }

        if (condition) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                errors.BAD_REQUEST_INVALID_DATE.message,
                errors.BAD_REQUEST_INVALID_DATE.code));
        }

        next();
    };
}
