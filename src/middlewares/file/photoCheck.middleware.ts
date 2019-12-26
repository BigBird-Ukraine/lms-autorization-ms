import { NextFunction, Response } from 'express';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../interfaces';

export const photoCheckMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    req.photos = [];

    if (!req.files) {
      next();
    }

    const files = Object.values(req.files);

    for (const file of files) {
      const {mimetype, size, name} = file as any;

      if (config.PHOTO_MIMETYPES.includes(mimetype)) {

        if (config.MAX_PHOTO_SIZE < size) {
          return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            `Max photo size is ${config.MAX_PHOTO_SIZE / (1024 * 1024)}mb`));
        }
        req.photos.push(file);

      } else {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, `File ${name} is not valid`));
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};
