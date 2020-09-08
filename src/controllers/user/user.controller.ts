import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { GoogleConfigEnum, ResponseStatusCodesEnum } from '../../constants';
import { googleDeleter, HASH_PASSWORD } from '../../helpers';
import { googleUploader } from '../../helpers/google-uploader.helper';
import { IPassedTest, IRequestExtended, IUser, IUserSubjectModel } from '../../interfaces';
import { userService } from '../../services';

class UserController {

  async createUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const user = req.body as IUser;

    user.password = await HASH_PASSWORD(user.password);
    const id = await userService.createUser(user);

    if (req.files) {
      const {files} = req.files;

      const video_path = await googleUploader(files,
        GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.PHOTO_GOOGLE_BUCKET_NAME
      );
      await userService.updateUser(id, {photo_path: `${video_path}`});
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
    const {user_id} = req.params;
    const {photo_path} = req.user as IUser;
    const [userPhoto] = req.photos as UploadedFile[];
    const updateInfo = req.body as IUser;

    if (userPhoto) {
      await googleDeleter(
        GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.PHOTO_GOOGLE_BUCKET_NAME, photo_path as string
      );

      updateInfo.photo_path = await googleUploader(userPhoto,
        GoogleConfigEnum.GOOGLE_VIDEO_KEYS,
        GoogleConfigEnum.VIDEO_GOOGLE_PROJECT_ID,
        GoogleConfigEnum.PHOTO_GOOGLE_BUCKET_NAME
      );
    }

    const updatedUser = await userService.updateUser(user_id, updateInfo);

    res.json({data: updatedUser});
  }

  async addTestResult(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const pt = req.passed_test as IPassedTest;

    await userService.addPassedTest(_id, {passed_lesson_id: req.passed_lesson_id, result: pt.result});

    res.json(pt.result);
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
