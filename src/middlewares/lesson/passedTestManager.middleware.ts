import { NextFunction, Response } from 'express';

import { checkPresentPassedLesson, checkPresentPassedQuestions } from '../../helpers/question';
import { ILesson, IPassedLesson, IPassedTest, IRequestExtended } from '../../interfaces';
import { IPassedQuestion } from '../../interfaces/passed_question.model';
import { lessonService } from '../../services/lesson';

export const passedTestManager = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const pt = req.passed_test as IPassedTest;
  const lesson = req.lesson as ILesson;
  const questions = req.body.questions as IPassedQuestion[];

  let passedLesson = lesson.last_valid_version;

  if (!passedLesson) {
    const passedQuestions = await checkPresentPassedQuestions(questions);

    const {label, description} = await lessonService.getLabelAndDescriptionOfLesson(pt.lesson_id);
    const passed_test: IPassedLesson = {
      questions: passedQuestions.map(q => q._id as string),
      lesson_label: label,
      lesson_description: description
    };

    const idPresentPassedLesson = await checkPresentPassedLesson(passed_test);
    idPresentPassedLesson ?
      passedLesson = idPresentPassedLesson :
      await lessonService.addPassedLesson(passed_test).then(les => passedLesson = les._id as string);

    await lessonService.editLessonById(lesson._id as string, {last_valid_version: passedLesson}, false);
  }

  req.passed_lesson_id = passedLesson;

  next();
};
