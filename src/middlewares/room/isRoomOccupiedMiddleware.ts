import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IRoom } from '../../interfaces';
import { roomService } from '../../services';

export const isRoomOccupiedMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {label, start_at, close_at} = req.body as IRoom;

  const roomByParams = {
    label,
    start_at: {
      $gte: start_at.getTime(),
      $lte: close_at.getTime()
    }
  };

  const rooms = await roomService.findRooms(roomByParams) as IRoom[];

  if (rooms) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.BAD_REQUEST,
      errors.BAD_REQUEST_ROOM_ALREADY_EXIST.message,
      errors.BAD_REQUEST_ROOM_ALREADY_EXIST.code));
  }

  next();
};
