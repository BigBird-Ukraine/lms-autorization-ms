import { model } from 'mongoose';
import { Question, QuestionSchema, QuestionType } from '../../database';
import { IQuestion } from '../../interfaces';

class QuestionService {

  createQuestion(questionValue: IQuestion): Promise<any> {
    const newQuestion = new Question(questionValue);
    return newQuestion.save();
  }

  getQuestions(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<IQuestion[]> {
    const QuestionModel = model<QuestionType>('Question', QuestionSchema);
    order = order === 'ASC' ? 'ASC' : 'DESC';

    return QuestionModel
      .find(filter)
      .select({ 'answers.correct': 0 })
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  async getMyQuestion(_id: string, limit: number, offset: number): Promise<IQuestion[]> {
    const QuestionModel = model<QuestionType>('Question', QuestionSchema);

    return QuestionModel
      .find({ user_id: `${_id}` }); // todo limit offset bug(dont queriing with this parameters)

  }

  async getQuestionById(questionId: string):  Promise<IQuestion> {
    const QuestionModel = model<QuestionType>('Question', QuestionSchema);

    return QuestionModel
      .findOne({ _id: `${questionId}` }) as any;
  }

  async deleteQuestionById(_id: string) {
    const QuestionModel = model<QuestionType>('Question', QuestionSchema);

    return QuestionModel.deleteOne({ _id });
  }
}

export const questionService = new QuestionService();
