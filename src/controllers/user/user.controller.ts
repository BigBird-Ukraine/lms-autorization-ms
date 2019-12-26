import { NextFunction, Response } from 'express';
import * as fs from 'fs-extra';
import * as Joi from 'joi';
import * as uuid from 'uuid';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD } from '../../helpers';
import { IRequestExtended, IUser, IUserSubjectModel } from '../../interfaces';
import { userService } from '../../services';
import { registerDataValidator } from '../../validators';

class UserController {

  async createUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const [photo] = req.photos as any;
      const userValidity = Joi.validate(user, registerDataValidator);

      if (userValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message));
      }

      user.password = await HASH_PASSWORD(user.password);

      const registeredUser = await userService.createUser(user);

      const {_id} = registeredUser;
      const photoDir = `user/${_id}/photo`;
      const photoExtension = photo.name.split('.').pop();
      const photoName = `${uuid.v1()}.${photoExtension}`;

      fs.mkdirSync(`${__dirname}/../../static/${photoDir}`, {recursive: true});
      await photo.mv(`${__dirname}/../../static/${photoDir}/${photoName}`);

      await userService.updateUser(_id, {photo_path: `${photoDir}/${photoName}`});

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id, name, surname, role_id, status, photo_path, groups_id} = req.user as IUser;

      const user: IUserSubjectModel = {
        _id,
        name,
        surname,
        role_id,
        status_id: status,
        photo_path,
        groups_id
      };

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
