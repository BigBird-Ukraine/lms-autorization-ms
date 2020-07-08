import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants';
import { OauthToken, OauthTokenScheme, OauthTokenType } from '../../database';
import { IOauthTokenModel, IUserFromTokenModel } from '../../interfaces';

class OAuthService {

  createOauthToken(createObject: IOauthTokenModel) {
    const newOauthToken = new OauthToken(createObject);

    return newOauthToken.save();
  }

  deleteOauthTokenByAccessToken(access_token: string): Promise<void> {
    const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

    return OauthTokenModel.deleteOne({access_token}) as any;
  }

  deleteOauthTokenByRefreshToken(refresh_token: string): Promise<void> {
    const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

    return OauthTokenModel.deleteOne({refresh_token}) as any;
  }

  getUserFromAccessToken(access_token: string): Promise<IUserFromTokenModel> {
    const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

    return OauthTokenModel.findOne({access_token}).populate('user_id').select({user_id: 1, _id: 0}) as any;
  }

  getUserFromRefreshToken(refresh_token: string): Promise<IUserFromTokenModel> {
    const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

    return OauthTokenModel.findOne({refresh_token}).populate('user_id').select({_id: 0}) as any;
  }

  getRefreshTokenByUserId(user_id: number) {
    const OauthTokenModel = model<OauthTokenType>(DatabaseTablesEnum.OAUTH_TOKEN_COLLECTION_NAME, OauthTokenScheme);

    return OauthTokenModel.findOne({user_id}) as any;
  }
}

export const oauthService = new OAuthService();
