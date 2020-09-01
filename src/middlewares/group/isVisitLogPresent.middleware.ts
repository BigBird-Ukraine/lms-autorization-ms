import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IGroup, IRequestExtended } from '../../interfaces';

export const isVisitLogPresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const group = req.group as IGroup;
  const { visitId } = req.query;

  let result = false;

  group.attendance.forEach(visitLog => (visitLog._id.toString() === visitId) && (result = true));

  if (!result) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_VISIT_LOG_NOT_PRESENT.message,
      errors.NOT_FOUND_VISIT_LOG_NOT_PRESENT.code
    ));
  }

  next();
};
