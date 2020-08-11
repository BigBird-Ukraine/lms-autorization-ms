import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { ResponseStatusCodesEnum } from '../../constants';
import { HASH_PASSWORD, updatedUserPhotoMv, userPhotoMv } from '../../helpers';
import { IRequestExtended, ITestResultModel, IUser, IUserSubjectModel } from '../../interfaces';
import { userService } from '../../services';

class UserController {

  async createUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const appRoot = (global as any).appRoot;
    const [userPhoto] = req.photos as UploadedFile[];

    user.password = await HASH_PASSWORD(user.password);
    const registeredUser = await userService.createUser(user);

    if (userPhoto) {
      const {photoDir, photoName, _id} = await userPhotoMv(registeredUser, userPhoto, appRoot);
      await userService.updateUser(_id, {photo_path: `${photoDir}/${photoName}`});
    }

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, email, phone_number, name, surname, role_id, status_id, photo_path, groups_id, population_point} = req.user as IUser;

    const user: IUserSubjectModel = {
      _id,
      email,
      phone_number,
      name,
      surname,
      role_id,
      status_id,
      photo_path,
      groups_id,
      population_point
    };

    res.json(user);
  }

  async updateUserByID(req: IRequestExtended, res: Response, next: NextFunction) {
    const appRoot = (global as any).appRoot;

    const {user_id} = req.params;
    let updateInfo = req.body as IUser;
    const [userPhoto] = req.photos as UploadedFile[];

    if (userPhoto) {
      updateInfo = await updatedUserPhotoMv(user_id, userPhoto, updateInfo, appRoot);
    }

    const updatedUser = await userService.updateUser(user_id, updateInfo);

    res.json({data: updatedUser});
  }

  async addTestResult(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const passed_test = req.passed_test as ITestResultModel;

    await userService.addPassedTest(_id, passed_test);
    const user = await userService.getUserByID(_id);

    res.json({data: user});
  }

  async getMyPassedTests(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;

    const data = await userService.getPassedTests(_id);

    res.json(data);
  }

  async getMyGroups(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;

    const data = await userService.getMyGroups(_id);

    res.json(data);
  }
}

export const userController = new UserController();
