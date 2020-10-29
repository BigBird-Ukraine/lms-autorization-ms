import { verify, VerifyErrors } from 'jsonwebtoken';

import { config } from '../../../configs';
import { ResponseStatusCodesEnum, StatusesEnum } from '../../../constants/enums';
import { errorHandlerSockets } from '../../../errors';
import { oauthService } from '../../../services';

export const checkAccessTokenMiddlewareSockets = async (socket: any) => {
    const authToken = socket.handshake.query.Authorization;

    if (!authToken) {
        errorHandlerSockets(StatusesEnum.NO_TOKEN, ResponseStatusCodesEnum.NO_CONTENT, socket);
    }

    verify(authToken, config.JWT_SECRET, (err: VerifyErrors) => {
        if (err) {
            errorHandlerSockets(StatusesEnum.NO_TOKEN, ResponseStatusCodesEnum.NO_CONTENT, socket);
        }
    });

    const user = await oauthService.getUserFromAccessToken(authToken);

    if (!user || !user.user_id) {
        errorHandlerSockets(StatusesEnum.NO_TOKEN, ResponseStatusCodesEnum.NO_CONTENT, socket);
    }

    return user;
};
