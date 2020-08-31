import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { Lesson, LessonSchema, LessonType, Module, PassedLesson, PassedLessonSchema, PassedLessonType, Question } from '../../database';
import { ILesson, IPassedLesson } from '../../interfaces';

class LessonService {

  createLesson(lessonValue: ILesson): Promise<void> {
    const newLesson = new Lesson(lessonValue);

    return newLesson.save() as any;
  }

  getLessons(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<ILesson[]> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);
    order = order === 'ASC' ? 'ASC' : 'DESC';

    return LessonModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  async getMyLesson(_id: string): Promise<ILesson[]> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .find({user_id: `${_id}`});
  }

  getLessonByID(lesson_id: string): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findById(lesson_id) as any;
  }

  getLessonsQuestionsById(lesson_id: string): Promise<any> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findById(lesson_id).select({questions_id: 1, _id: 0}) as any;
  }

  getQuestionsForTestByLessonId(lesson_id: string, statusAnswers: number) {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.findById(lesson_id)
      .select({ questions_id: 1, _id: 0 })
      .populate('questions_id', {'answers.correct' : statusAnswers}) as any;
  }

  editLessonById(lesson_id: string, updatingData: Partial<ILesson>, lastVStatus: boolean): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return lastVStatus ? LessonModel.findByIdAndUpdate(lesson_id, {
        ...updatingData,
        last_valid_version: ''
      }) as any :
      LessonModel.findByIdAndUpdate(lesson_id, updatingData) as any;
  }

  addQuestionsToLesson(lesson_id: string, questions_list: string): Promise<ILesson> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    // @ts-ignore
    return LessonModel.findByIdAndUpdate(lesson_id, {$set: {questions_id: questions_list},
      last_valid_version: ''}, {new: true}) as any;
  }

  deleteLessonById(lesson_id: string): Promise<void> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .findByIdAndRemove(lesson_id, (err, post) => {
        Module.update(
          {lessons_list: lesson_id},
          {$pull: {lessons_list: lesson_id}},
          {multi: true})
          .exec();

        Question.update(
          {lesson_id},
          {$pull: {lesson_id}},
          {multi: true})
          .exec();

      }) as any;
  }

  getSizeOfAll(filterParams: Partial<ILesson>): Promise<any> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel
      .countDocuments(filterParams) as any;
  }

  getLabelAndDescriptionOfLesson(id: string): Promise<Partial<ILesson>> {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.findById(id).select({label: 1, description: 1, _id: 0}) as any;
  }

  resetLastValidLessons(lessons_id: string[]) {
    const LessonModel = model<LessonType>(DatabaseTablesEnum.LESSON_COLLECTION_NAME, LessonSchema);

    return LessonModel.bulkWrite(lessons_id.map(lesson_id => {
      return {
        updateOne: {
          filter: {_id: lesson_id},
          update: {
            $set: {last_valid_version: ''}
          },
          upsert: true
        }
      };
    }));
  }

  addPassedLesson(passed_test: IPassedLesson): Promise<IPassedLesson> {
    const newPassedLesson = new PassedLesson(passed_test);

    return newPassedLesson.save() as any;
  }

  getPassedLessonByParams(lesson: Partial<IPassedLesson>): Promise<IPassedLesson> {
    const PassedLessonModel = model<PassedLessonType>(DatabaseTablesEnum.PASSED_LESSON_COLLECTION_NAME, PassedLessonSchema);

    return PassedLessonModel.findOne(lesson) as any;
  }
}

export const lessonService = new LessonService();
