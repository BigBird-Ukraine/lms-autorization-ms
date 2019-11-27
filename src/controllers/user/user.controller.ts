import { NextFunction, Request, Response } from 'express';

import { userService } from '../../services';

class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user  = req.body;

            await userService.createNewUser(user);

            res.json('user created');
        } catch (e) {
            next(e);
        }

    }

}

export const userController = new UserController();
