import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';

export const photoCheckMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    req.photos = [];

    if (!req.files) {
      next();
    }

    const {files} = req.files;
    // tslint:disable-next-line:prefer-for-of //TODO
    for (let i = 0; i < files.length; i++) {
      const {mimetype, size, name} = files[i] as UploadedFile;

      if (config.PHOTO_MIMETYPES.includes(mimetype)) {

        if (config.MAX_PHOTO_SIZE < size) {
          return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_MAX_PHOTO_SIZE.message,
            errors.BAD_REQUEST_MAX_PHOTO_SIZE.code
          ));
        }
        req.photos.push(files[i]);

      } else {
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          `File ${name} is not valid`,
          errors.BAD_REQUEST_INVALID_FILE_MIMETYPE.code
        ));
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};
