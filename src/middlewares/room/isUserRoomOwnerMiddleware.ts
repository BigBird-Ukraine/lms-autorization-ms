import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom, IUser } from '../../interfaces';

export const isRoomOwnerMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {_id} = req.user as IUser;
    const {owner_id} = req.room as IRoom;

    if (owner_id.toString() !== _id.toString()) {
      return next(new ErrorHandler(
          ResponseStatusCodesEnum.FORBIDDEN,
          errors.FORBIDDEN_NOT_YOUR_ROOM.message,
          errors.FORBIDDEN_NOT_YOUR_ROOM.code));
    }

    next();
  } catch (e) {
    return next(e);
  }
};
