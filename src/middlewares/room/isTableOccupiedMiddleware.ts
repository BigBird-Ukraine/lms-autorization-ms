import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { checkDateExist, checkUserTablePlaceExist } from '../../helpers/room';
import { IBookUser, IRequestExtended, IRoom, IUser } from '../../interfaces';

export const isTableOccupiedMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {_id} = req.user as IUser;
    const {rent_end, rent_start, table_number} = req.body as IBookUser;
    const arrayOfRoom = [req.room] as IRoom[];

    const statusExist = checkDateExist(arrayOfRoom, rent_start, rent_end, table_number);

    if (statusExist) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_TABLE_ALREADY_EXIST.message,
            errors.BAD_REQUEST_TABLE_ALREADY_EXIST.code));
    }

    const statusUserTableExist = checkUserTablePlaceExist(arrayOfRoom[0].booked_users, _id, rent_start, rent_end);
    if (statusUserTableExist) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_TABLE_ALREADY_EXIST.message,
            errors.BAD_REQUEST_TABLE_ALREADY_EXIST.code));
    }

    next();
};
