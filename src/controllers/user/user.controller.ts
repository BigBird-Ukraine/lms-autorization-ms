import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs-extra';
import * as Joi from 'joi';
import { resolve as resolvePath } from 'path';
import * as uuid from 'uuid';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD } from '../../helpers';
import { IRequestExtended, ITestResultModel, IUser, IUserSubjectModel } from '../../interfaces';
import { userService } from '../../services';
import { registerDataValidator, updateDataValidator } from '../../validators';

class UserController {

  async createUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUser;

      const appRoot = (global as any).appRoot;
      const [userPhoto] = req.photos as UploadedFile[];
      const userValidity = Joi.validate(user, registerDataValidator);

      if (userValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message));
      }

      user.password = await HASH_PASSWORD(user.password);

      const registeredUser = await userService.createUser(user);

      if (userPhoto) {
        const {_id} = registeredUser;
        const photoDir = `user/${_id}/photo`;
        const photoExtension = userPhoto.name.split('.').pop();
        const photoName = `${uuid.v1()}.${photoExtension}`;

        fs.mkdirSync(resolvePath(`${appRoot}/static/${photoDir}`), {recursive: true});
        await userPhoto.mv(resolvePath(`${appRoot}/static/${photoDir}/${photoName}`));
        await userService.updateUser(_id, {photo_path: `${photoDir}/${photoName}`});
      }

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id, email, phone_number, name, surname, role_id, status_id, photo_path, groups_id} = req.user as IUser;

      const user: IUserSubjectModel = {
        _id,
        email,
        phone_number,
        name,
        surname,
        role_id,
        status_id,
        photo_path,
        groups_id
      };

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateUserByID(req: IRequestExtended, res: Response, next: NextFunction) {
    const {user_id} = req.params;
    const updateInfo = req.body as IUser;
    const appRoot = (global as any).appRoot;
    const [userPhoto] = req.photos as UploadedFile[];

    if (userPhoto) {

      const photoDir = `user/${user_id}/photo`;

      const photoExtension = userPhoto.name.split('.').pop();
      const photoName = `${uuid.v1()}.${photoExtension}`;
      const oldPhotos = fs.readdirSync(resolvePath(`${appRoot}/static/${photoDir}`));

      if (oldPhotos) {

        for (const photo of oldPhotos) {
          fs.unlinkSync(resolvePath(`${appRoot}/static/${photoDir}/${photo}`));
        }
      }

      fs.mkdirSync(resolvePath(`${appRoot}/static/${photoDir}`), {recursive: true});

      await userPhoto.mv(resolvePath(`${appRoot}/static/${photoDir}/${photoName}`));
      updateInfo.photo_path = `${photoDir}/${photoName}`;
    }

    const updateValidity = Joi.validate(updateInfo, updateDataValidator);

    if (updateValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, updateValidity.error.details[0].message));
    }

    await userService.updateUser(user_id, updateInfo);

    const user = await userService.getUserByID(user_id);

    res.json({data: user});
  }

  async addTestResult(req: IRequestExtended, res: Response, next: NextFunction) {

    const { _id } = req.user as IUser;
    const passed_test = req.passed_test as ITestResultModel;

    await userService.addPassedTest(_id, passed_test);

    const user = await userService.getUserByID(_id);

    res.json({data: user});
  }
}

export const userController = new UserController();
