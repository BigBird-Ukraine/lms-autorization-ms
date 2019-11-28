import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';
import { GroupDBModel } from './group.model';
import { UserDBModel } from './user.model';

export interface IUserToGroupModel {
    id: number;
    user_id: number;
    group_id: number;
    created_at: string;
    updated_at?: string;
}

const modelAttributes: DBModelFieldInit<IUserToGroupModel> = {
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
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('UTC_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE
    }
};

export class UserToGroupDBModel extends Model {}
UserToGroupDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DbTablesName.USER_TO_GROUP,
        tableName: DbTablesName.USER_TO_GROUP,
        timestamps: false
    }
);

UserToGroupDBModel.belongsTo(UserDBModel, { foreignKey: 'user_id' });
UserToGroupDBModel.belongsTo(GroupDBModel, { foreignKey: 'group_id' });
