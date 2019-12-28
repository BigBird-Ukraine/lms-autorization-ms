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
}

export const lessonService = new LessonService();
