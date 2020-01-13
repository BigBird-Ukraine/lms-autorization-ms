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

    return UserModel.findByIdAndUpdate(user_id, {$push: {passed_tests: passed_test}}) as any;
  }
}

export const userService = new UserService();
