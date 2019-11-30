import { Op, Transaction, WhereOptions } from 'sequelize';

import { IOauthTokenModel, IUser, OauthTokenDBModel, UserDBModel } from '../../database';

class OAuthService {

    createOauthToken(createObject: IOauthTokenModel, transaction: Transaction): Promise<void> {
        return OauthTokenDBModel.create(createObject, { transaction }) as any;
    }

    deleteOathTokenByParams(deleteObject: WhereOptions, transaction: Transaction) {
        return OauthTokenDBModel.destroy({
            where: deleteObject,
            transaction
        });
    }

    async getUserFromAccessToken(access_token: string): Promise<IUser> {
        const dbResponse: any = await OauthTokenDBModel.findOne({
            where: {
                access_token: {
                    [Op.like]: access_token
                }
            },
            include: [{
                model: UserDBModel
            }]
        });

        return dbResponse && dbResponse.user && dbResponse.user.dataValues;
    }

    async getUserFromRefreshToken(refresh_token: string): Promise<any> {
        const dbResponse: any = await OauthTokenDBModel.findOne({
            where: {
                refresh_token: {
                    [Op.like]: refresh_token
                }
            },
            include: [{
                model: UserDBModel
            }]
        });

        return dbResponse && dbResponse.user && dbResponse.user.dataValues;
    }

}

export const oauthService = new OAuthService();
