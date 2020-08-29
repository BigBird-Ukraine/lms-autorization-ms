import { NextFunction, Response } from 'express';
import { checkPassedTestDataHelper } from '../../helpers';

import { IRequestExtended } from '../../interfaces';

export const checkPassedTestData = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {lesson_id} = req.params;
    const question_list = req.body.test;

    req.passed_test = await checkPassedTestDataHelper(lesson_id, question_list) as any;

    next();
  } catch (e) {
    next(e);
  }
};
