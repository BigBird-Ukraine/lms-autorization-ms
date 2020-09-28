import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom, IUser } from '../../interfaces';

export const isRentOwner = (req: IRequestExtended, res: Response, next: NextFunction) => {
    const room = req.room as IRoom;
    const user = req.user as IUser;
    const {rent_id} = req.params;

    const status = room.booked_users.find(
        bu => bu._id?.toString() === rent_id &&
            bu.user_id.toString() === user._id.toString()
    );

    if (!status) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.FORBIDDEN,
            errors.FORBIDDEN_NOT_YOUR_PLACE.message,
            errors.FORBIDDEN_NOT_YOUR_PLACE.code
        ));
    }
    next();
};
