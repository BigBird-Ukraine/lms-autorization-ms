import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { lessonService } from '../../services/lesson';

export const checkQuestionsListLenght = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { lesson_id } = req.params;
    const { questions_id } = await lessonService.getLessonsQuestionsById(lesson_id);
    const { NewQuestions_id } = req.body;

    const newQuestions_list = [...NewQuestions_id];
    const questions_list = [...questions_id];

    if (questions_list.length + newQuestions_list.length > 21) {
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          errors.BAD_REQUEST_LIMIT_QUESTION.message,
          errors.BAD_REQUEST_LIMIT_QUESTION.code
        ));
    }

    next();
  } catch (e) {
    next(e);
  }
};
