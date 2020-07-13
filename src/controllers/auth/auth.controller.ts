import { NextFunction, Response } from 'express';

import { HardWordsEnum, UserActionEnum } from '../../constants';
import { tokenizer } from '../../helpers';
import { IRequestExtended, IUser } from '../../interfaces';
import { oauthService } from '../../services';

class AuthController {
  async loginUser(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;
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
      const access_token = req.get(HardWordsEnum.AUTHORIZATION) as string;

      await oauthService.deleteOauthTokenByAccessToken(access_token);

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;
      const refresh_token = req.refresh_token;

      const { accessToken, refreshToken } = tokenizer(UserActionEnum.AUTH);

      await oauthService.deleteOauthTokenByRefreshToken(refresh_token);
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
}

export const authController = new AuthController();
