import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { VerifyErrors } from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { oauthService } from '../../services';

export const checkRefreshTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
        const token = req.get('Authorization') as string;

        if (!token) {
            return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'No token'));
        }

        jwt.verify(token, config.JWT_REFRESH_SECRET, (err: VerifyErrors) => {
            if (err) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'Bad_tokens'));
            }
        });

        const user = await oauthService.getUserFromRefreshToken(token);

        if (!user || !user.user_id) {
            return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message));
        }

        req.user = user.user_id;
        req.refresh_token = token;
        next();
    } catch (e) {

        next(e);
    }
};
