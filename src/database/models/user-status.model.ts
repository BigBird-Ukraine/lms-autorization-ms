import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IUserStatusModel {
    id: number;
    status: string;
}

const modelAttributes: DBModelFieldInit<IUserStatusModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

export class UserStatusDBModel extends Model {}
UserStatusDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DbTablesName.USER_STATUS,
        tableName: DbTablesName.USER_STATUS,
        timestamps: false
    }
);
