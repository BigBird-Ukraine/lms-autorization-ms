import * as mongoose from 'mongoose';
import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { PassedTest, PassedTestSchema, PassedTestType, User, UserSchema, UserType } from '../../database';
import { IPassedTest, IUser } from '../../interfaces';

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

  addPassedTest(passed_test: IPassedTest): Promise<any> {
    const newPassedTest = new PassedTest(passed_test);

    return newPassedTest.save();
  }

  getPassedTests(id: string) {
    const PassedTestModel = model<PassedTestType>(DatabaseTablesEnum.PASSED_TEST_COLLECTION_NAME, PassedTestSchema);

    return PassedTestModel.find({
      user_id: id
    });
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
