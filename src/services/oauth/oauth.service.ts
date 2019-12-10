import { model } from 'mongoose';

import { OauthToken, OauthTokenScheme, OauthTokenType } from '../../database';
import { IOauthTokenModel } from '../../Interfaces';

class OAuthService {

    createOauthToken(createObject: IOauthTokenModel) {
        const newOauthToken = new OauthToken(createObject);
        return newOauthToken.save();
    }

    deleteOauthTokenByAccessToken(access_token: string): Promise<void> {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.deleteOne({ access_token }) as any;
    }

    deleteOauthTokenByRefreshToken(refresh_token: string): Promise<void> {
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.deleteOne({ refresh_token }) as any;
    }

    async getUserFromAccessToken(access_token: string): Promise<any> { // TODO model
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.findOne({ access_token }).populate('user_id').select({ user_id: 1, _id: 0 });
    }

    async getUserFromRefreshToken(refresh_token: string): Promise<any> { // TODO model
        const OauthTokenModel = model<OauthTokenType>('Oauth_token', OauthTokenScheme);

        return OauthTokenModel.findOne({ refresh_token }).populate('user_id').select({ _id: 0 }) as any;
    }
}

export const oauthService = new OAuthService();
