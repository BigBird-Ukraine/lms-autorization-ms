import { model } from 'mongoose';

import * as mongoose from 'mongoose';
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

    return UserModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'Group',
          localField: 'groups_id',
          foreignField: '_id',
          as: 'groups'
        }
      },
      {$project: {groups: {course_id: 1}}},
      {
        $unwind: '$groups'
      },
      {
        $lookup: {
          from: 'Course',
          localField: 'groups.course_id',
          foreignField: '_id',
          as: 'courses'
        }
      }
    ]);
  }
}

export const courseService = new CourseService();
