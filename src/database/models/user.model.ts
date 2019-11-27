import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { UserRoleEnum, UserStatusEnum } from '../../constants';
import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';
import { UserRoleDBModel } from './user-role.model';
import { UserStatusDBModel } from './user-status.model';

export interface IUserModel {
    id: number;
    email: string;
    name: string;
    surname: string;
    password: string;
    role_id?: number;
    status_id?: number;
    photo_path?: string;
    created_at: string;
    updated_at?: string;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    surname: string;
    role_id?: number;
    status_id?: number;
    photo_path?: string;
    created_at: string;
}

const modelAttributes: DBModelFieldInit<IUserModel> = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: {
                msg: 'Please enter correct email'
            },
            notNull: {
                msg: 'Please enter your email'
            }
        }

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: UserRoleEnum.STUDENT,
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: UserStatusEnum.ACTIVE,
        allowNull: false
    },
    photo_path: {
        type: DataTypes.STRING
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

export class UserDBModel extends Model {}
UserDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DbTablesName.USER,
        tableName: DbTablesName.USER,
        timestamps: false
    }
);

UserDBModel.belongsTo(UserRoleDBModel, { foreignKey: 'role_id' });
UserDBModel.belongsTo(UserStatusDBModel, { foreignKey: 'status_id' });
