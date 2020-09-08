import { NextFunction, Response } from 'express';

import { config } from '../../configs';
import { HardWordsEnum, MailSender, UserActionEnum } from '../../constants';
import { HASH_PASSWORD, tokenizer } from '../../helpers';
import { IRequestExtended, IUser } from '../../interfaces';
import { mailService, oauthService, userService } from '../../services';

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

  async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {email, _id} = req.user as IUser;

      const reset_token = tokenizer(UserActionEnum.RESET_PASS);
      const url = `${config.CLIENT_HOST}:${config.CLIENT_PORT}/user/reset/${reset_token}`;

      await userService.updateUser(_id, {reset_token});
      await mailService.sendEmail(email, MailSender.RESET_EMAIL_SUBJECT, url);

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id} = req.user as IUser;
      const {password} = req.body as IUser;

      const hashedPassword = await HASH_PASSWORD(password);
      await userService.updateUser(_id, {password: hashedPassword, reset_token: ''});

      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
