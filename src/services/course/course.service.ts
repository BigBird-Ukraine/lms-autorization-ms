import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { CourseSchema, CourseType, UserSchema, UserType } from '../../database';
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
      .findOne({ _id: course_id })
      .populate('modules_list')
      .select({ _id: 0 }) as any;
  }

  getSizeOfAll(filterParams: Partial<ICourse>): Promise<any> {
    const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

    return CourseModel
      .countDocuments(filterParams) as any;
  }

  getMyCourses(id: string) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findById(id)
      .populate({
        path: 'groups_id',
        select: {course_id: 1, _id: 0},
        populate: {
          path: 'course_id',
          select: {label: 1, description: 1, _id: 0},
          populate: {
            path: 'modules_list',
            select: {description: 1, label: 1, lessons_list: 1, _id: 0},
            populate: {
              path: 'lessons_list',
              select: {description: 1, label: 1}
            }
          }
        }
      })
      .select({groups_id: 1, _id: 0});
  }

  getAllCourseLabel() {
    const CourseModel = model<CourseType>(DatabaseTablesEnum.COURSE_COLLECTION_NAME, CourseSchema);

    return CourseModel.find().select({label: 1, _id: 0});
  }
}

export const courseService = new CourseService();
