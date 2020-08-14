import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { User, UserSchema, UserType } from '../../database';
import { ITestResultModel, IUser } from '../../interfaces';

class UserService {
  createUser(userValue: IUser): Promise<any> {
    const newUser = new User(userValue);
    return newUser.save();
  }

  getUserByParams(params: Partial<IUser>) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findOne(params);
  }

  getUserByID(user_id: string): Promise<IUser> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findById(user_id).select({password: 0}) as any;
  }

  updateUser(user_id: string, patchObject: Partial<IUser>): Promise<any> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel
      .findByIdAndUpdate(user_id, patchObject) as any;
  }

  addPassedTest(user_id: string, passed_test: ITestResultModel): Promise<void> {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    // @ts-ignore
    return UserModel.findByIdAndUpdate(user_id, {$push: {passed_tests: passed_test}}) as any;
  }

  getPassedTests(id: string) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.findById(id)
      .populate({
        path: 'passed_tests.lesson_id',
        select: {label: 1, description: 1, _id: 0}
      })
      .populate({
        path: 'passed_tests.questions_id',
        select: {questions: 1, description: 1, level: 1, subject: 1, _id: 0}
      })
      .select({passed_tests: 1, _id: 0});
  }

  getMyGroups(id: string) {
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
      {$project: {groups: {city: 1, created_at: 1, finished_at: 1, label: 1, _id: 1, attendance: 1}, _id: 0}}
    ]);
  }
}

export const userService = new UserService();
