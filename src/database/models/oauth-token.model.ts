import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';
import { UserDBModel } from './user.model';

export interface IOauthTokenModel {
    id: number;
    user_id: number;
    access_token: string;
    refresh_token: string;
}

const modelAttributes: DBModelFieldInit<IOauthTokenModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

export class OauthTokenDBModel extends Model {}
OauthTokenDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DbTablesName.OAUTH_TOKEN,
        tableName: DbTablesName.OAUTH_TOKEN,
        timestamps: false
    }
);

OauthTokenDBModel.belongsTo(UserDBModel, { foreignKey: 'user_id' });
