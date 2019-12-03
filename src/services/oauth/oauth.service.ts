import { model } from 'mongoose';

import { OauthToken, OauthTokenScheme, OauthTokenType } from '../../database';
import { IOauthTokenModel } from '../../Interfaces';

class OAuthService {

    createOauthToken(createObject: IOauthTokenModel) {
        const newOauthToken = new OauthToken(createObject);
        return newOauthToken.save();
    }

    deleteOauthTokenByAccessToken(access_token: string) {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.deleteOne({ access_token });
    }

    async getUserFromAccessToken(access_token: string) {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.findOne({ access_token }).populate('user_id').select({ user_id: 1, _id: 0 });
    }

    async getUserFromRefreshToken() {

    }

}

export const oauthService = new OAuthService();
