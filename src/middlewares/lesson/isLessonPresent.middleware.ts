import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services';

export const isLessonPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const {lesson_id} = req.params;

  if(!lesson_id) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST,
        errors.BAD_REQUEST_WRONG_PARAMS.message,
        errors.BAD_REQUEST_WRONG_PARAMS.code
    ))
  }

  const lesson = await lessonService.getLessonByID(lesson_id);

  if (!lesson) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_LESSON_NOT_PRESENT.message,
      errors.NOT_FOUND_LESSON_NOT_PRESENT.code));
  }

  req.lesson = lesson;

  next();
};
