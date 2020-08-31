import { IPassedQuestion } from '../../interfaces/passed_question.model';
import { questionService } from '../../services/question';

export const checkPresentPassedQuestions = async (questions: Partial<IPassedQuestion[]>) => {
  const presentQuestions: IPassedQuestion[] = [];
  const notPresentQuestions: IPassedQuestion[] = [];

  for await (const value of questions) {
    const {question, description, level, subject} = value as IPassedQuestion;
    const presentPassedQuestion = await questionService.getPassedQuestionByParams({
      question,
      description,
      level,
      subject
    });

    presentPassedQuestion ? presentQuestions.push(presentPassedQuestion) : notPresentQuestions.push(value as IPassedQuestion);
  }

  const savedNotPresentQuestions = await questionService.savePassedQuestions(notPresentQuestions);

  return [...presentQuestions, ...savedNotPresentQuestions];
};
