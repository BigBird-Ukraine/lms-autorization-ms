import { model } from 'mongoose';

import { Lesson, LessonSchema, LessonType } from '../../database';
import { ILesson } from '../../interfaces';

class LessonService {

  createLesson(lessonValue: ILesson): Promise<void> {
    const newLesson = new Lesson(lessonValue);

    return newLesson.save() as any;
  }

  getLessons(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<ILesson[]> {
    const LessonModel = model<LessonType>('Lesson', LessonSchema);
    order = order === 'ASC' ? 'ASC' : 'DESC';

    return LessonModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  getLessonByID(lesson_id: string): Promise<ILesson> {
    const LessonModel = model<LessonType>('Lesson', LessonSchema);

    return LessonModel
      .findById(lesson_id) as any;
  }

  editMyLesson(lesson_id: string, updatingData: Partial<ILesson>): Promise<ILesson> {
    const LessonModel = model<LessonType>('Lesson', LessonSchema);

    return LessonModel
      .findByIdAndUpdate(lesson_id, updatingData) as any;
  }

  deleteMyLesson(lesson_id: string): Promise<void> {
    const LessonModel = model<LessonType>('Lesson', LessonSchema);

    return LessonModel
      .findByIdAndDelete(lesson_id) as any;
  }
}

export const lessonService = new LessonService();
