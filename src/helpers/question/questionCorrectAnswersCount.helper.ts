import { IAnswers } from '../../interfaces';

export const questionCorrectAnswersCount = async (questions: IAnswers[]) => {
  let correctAnswersCount = 0;

  questions.forEach(question => {
    question.answers.forEach(answer => answer.correct && correctAnswersCount++);
  });

  return correctAnswersCount;
};
