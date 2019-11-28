import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IUserRoleModel {
    id: number;
    label: string;
}

const modelAttributes: DBModelFieldInit<IUserRoleModel> = {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  label: {
      type: DataTypes.STRING,
      allowNull: false
  }
};

export class UserRoleDBModel extends Model {}
UserRoleDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DbTablesName.USER_ROLE,
        tableName: DbTablesName.USER_ROLE,
        timestamps: false
    }
);
