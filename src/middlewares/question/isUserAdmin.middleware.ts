import {NextFunction, Response} from 'express';

import {ResponseStatusCodesEnum, StatusesEnum, UserRoleEnum} from '../../constants';
import {ErrorHandler} from '../../errors';
import {IRequestExtended} from '../../interfaces';

export const isUserAdminMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {role_id} = req.user;

    if (role_id === UserRoleEnum.STUDENT) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.FORBIDDEN,
                StatusesEnum.NO_PERMISSIONS_TO_ACTION
            )
        );
    }

    next();
};
