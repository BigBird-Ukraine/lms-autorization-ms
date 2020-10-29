import { IPassedLessonFull } from './passed_lesson.model';
import { IPassedQuestion } from './passed_question.model';

export interface ITestResultModel {
  _id?: string;
  passed_lesson_id?: string;
  passed_questions_id?: string[];
  result: number;
  max_mark: number;
  passed_at?: Date;
}

export interface ITestResultFullModel {
  _id?: string;
  passed_lesson_id?: IPassedLessonFull;
  passed_questions_id?: IPassedQuestion[];
  result: number;
  max_mark: number;
  passed_at?: Date;
}

export interface IPassedTest {
  lesson_id: string;
  result: number;
  max_mark: number;
  questions_id: string[];
}
