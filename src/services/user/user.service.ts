import { model } from 'mongoose';
import * as mongoose from 'mongoose';

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

    return UserModel.findByIdAndUpdate(user_id, {$push: {passed_tests: passed_test}}) as any;
  }

  getPassedTests(id: string) {
    const UserModel = model<UserType>(DatabaseTablesEnum.USER_COLLECTION_NAME, UserSchema);

    return UserModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'Lesson',
          localField: 'passed_tests.lesson_id',
          foreignField: '_id',
          as: 'lessons'
        }
      },
      {
        $lookup: {
          from: 'Question',
          localField: 'passed_tests.questions_id',
          foreignField: '_id',
          as: 'questions'
        }
      },
      {$project: {lessons: 1, questions: 1, passed_tests: 1}}
    ]);
  }
}

export const userService = new UserService();
