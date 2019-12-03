import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD } from '../../helpers';
import { userService } from '../../services';
import { registerDataValidator } from '../../validators';
import { IRequestExtended, IUserSubjectModel } from '../../Interfaces';

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user  = req.body;

            const userValidity = Joi.validate(user, registerDataValidator);

            if (userValidity.error) {
                throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message);
            }

            user.password = await HASH_PASSWORD(user.password);

            await userService.createUser(user);

            res.status(ResponseStatusCodesEnum.CREATED).end();
        } catch (e) {
            next(e);
        }
    }

    async getUserInfoByToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user_id } = req.user;

            const user: IUserSubjectModel = {
                name: user_id.name,
                surname: user_id.surname,
                role_id: user_id.role,
                status_id: user_id.status,
                photo_path: user_id.photo_path,
                group: user_id.group
            };

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
