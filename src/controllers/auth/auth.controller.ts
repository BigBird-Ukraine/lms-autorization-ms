import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../Interfaces';

class UserController {

  // todo needs transaction here to inster token pair into DB
  async loginUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const authInfo = req.body;
      console.log(authInfo);

      res.json({
        data: {
          accessToken: 'Access_token',
          refreshToken: 'REFRESH_token'
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async logoutUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      res.end();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      res.json({
        data: {
          accessToken: 'Access_token',
          refreshToken: 'REFRESH_token'
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new UserController();
