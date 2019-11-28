import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IGroupModel {
    id?: number;
    label?: string;
    created_at?: string;
}

const modelAttributes: DBModelFieldInit<IGroupModel> = {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
  label: {
      type: DataTypes.STRING,
      allowNull: false
  },
  created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('UTC_TIMESTAMP'),
      allowNull: false
  }
};

export class GroupDBModel extends Model {}
GroupDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DbTablesName.GROUP,
        tableName: DbTablesName.GROUP,
        timestamps: false
    }
);
