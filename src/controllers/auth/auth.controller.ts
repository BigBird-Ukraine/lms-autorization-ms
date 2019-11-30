import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../Interfaces';

class UserController {

  // todo needs transaction here to inster token pair into DB
  async loginUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const authInfo = req.body;
      console.log(authInfo);

      res.json({
        access_token: 'Access_token',
        refresh_token: 'REFRESH_token'
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new UserController();
