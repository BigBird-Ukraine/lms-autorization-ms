import { NextFunction } from 'express';
import { ResponseStatusCodesEnum, StatusesEnum, UserRoleEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';

export const checkAdminRole = (role: UserRoleEnum, next: NextFunction) => {
    if (role === UserRoleEnum.STUDENT) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.FORBIDDEN,
                StatusesEnum.NO_PERMISSIONS_TO_ACTION
            )
        );
    }
};
