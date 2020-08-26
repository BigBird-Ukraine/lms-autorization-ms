import { IAnswers } from '../../interfaces';
import { lessonService } from '../../services/lesson';

export const questionCorrectAnswersCount = async (lesson_id: string) => {
  let correctAnswersCount = 0;
  const {questions_id} = await lessonService.getQuestionsForTestByLessonId(lesson_id, 1) as IAnswers;

  questions_id.forEach(question => {
    question.answers.forEach(answer => answer.correct && correctAnswersCount++);
  });

  return correctAnswersCount;
};
