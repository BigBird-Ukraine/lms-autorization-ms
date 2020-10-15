import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom } from '../../interfaces';

export const checkUserLocationMiddleware =  (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {address} = req.body as IRoom;
    const room = req.room as IRoom;

    const ky = 40000 / 360;
    const kx = Math.cos(Math.PI * room.address.latitude / 180.0) * ky;
    const dx = Math.abs(room.address.longitude - address?.longitude) * kx;
    const dy = Math.abs(room.address.latitude - address?.latitude) * ky;

    if ( Math.sqrt(dx * dx + dy * dy) <= 0.5 ) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_INVALID_LOCATION.message,
            errors.BAD_REQUEST_INVALID_LOCATION.code));
    }

    next();
};
