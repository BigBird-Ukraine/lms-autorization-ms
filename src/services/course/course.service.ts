import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { CourseSchema, CourseType } from '../../database';
import { ICourse, IModule } from '../../interfaces';

class CourseService {

  getCourses(limit: number, offset: number, sort: string, order?: string, filter?: any): Promise<ICourse[]> {
    const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

    return CourseModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort({
        [sort]: order
      }) as any;
  }

  getCourseByID(course_id: string): Promise<IModule> {
    const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

    return CourseModel
      .findOne({_id: course_id})
      .populate('modules_list')
      .select({_id: 0}) as any;
  }
}

export const courseService = new CourseService();
