import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { checkIpAddress, checkUserLocation } from '../../helpers/room';
import { IIpAddress, IIpRoom, IRequestExtended } from '../../interfaces';

export const checkUserLocationMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {address, ip} = req.body as IIpAddress;
    const room = req.room as IIpRoom;

    const ipCheckedStatus = await checkIpAddress(ip, room.ip_address.ip);

    if (!ipCheckedStatus) {
        const locationCheckedStatus = checkUserLocation(room, address);

        if (!locationCheckedStatus) {
            return next(new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                errors.BAD_REQUEST_INVALID_LOCATION.message,
                errors.BAD_REQUEST_INVALID_LOCATION.code));
        }
    }

    next();
};
