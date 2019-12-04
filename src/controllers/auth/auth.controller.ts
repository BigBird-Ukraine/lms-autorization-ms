import { NextFunction, Response } from 'express';

import { UserActionEnum } from '../../constants';
import { tokenizer } from '../../helpers';
import { oauthService } from '../../services';
import { IRequestExtended } from '../../Interfaces';

class UserController {

  // todo needs transaction here to inster token pair into DB
  async loginUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user;

      const { accessToken, refreshToken } = tokenizer(UserActionEnum.AUTH);

      await oauthService.createOauthToken({
          access_token: accessToken,
          refresh_token: refreshToken,
          user_id: _id
      });

      res.json({
        data: {
          accessToken,
          refreshToken
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async logoutUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get('Authorization') as string;

      await oauthService.deleteOauthTokenByAccessToken(accessToken);

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {

      const { user_id } = req.user;

      const { accessToken, refreshToken } = tokenizer(UserActionEnum.AUTH);

      await oauthService.deleteOauthTokenByUserId(user_id);

      await oauthService.createOauthToken({
        access_token: accessToken,
        refresh_token: refreshToken,
        user_id
      });

      res.json({
        data: {
          accessToken,
          refreshToken
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new UserController();
