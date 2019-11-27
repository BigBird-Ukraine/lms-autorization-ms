import { ModelAttributes, QueryInterface, QueryOptions } from 'sequelize';

import { UserRoleEnum, UserStatusEnum } from '../../constants';
import { DbTablesName } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import {
    IGroupModel,
    IOauthTokenModel,
    IUserModel,
    IUserRoleModel,
    IUserStatusModel,
    IUserToGroupModel
} from '../models';
import { migrationWrapper } from '../transactions';

export default {
    up: async (queryInterface: QueryInterface, dataTypes: any) => {
        try {
            const migration = async (options: QueryOptions) => {
                const userModelAttributes: DBModelFieldInit<IUserModel> = {
                    id: {
                        type: dataTypes.INTEGER(11),
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    email: {
                        type: dataTypes.STRING(255),
                        allowNull: false,
                        unique: true
                    },
                    name: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    },
                    surname: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    },
                    password: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    },
                    role_id: {
                        type: dataTypes.INTEGER(11),
                        defaultValue: UserRoleEnum.STUDENT,
                        allowNull: false,
                        references: {
                            model: DbTablesName.USER_ROLE,
                            key: 'id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'SET NULL'
                    },
                    status_id: {
                        type: dataTypes.INTEGER(11),
                        defaultValue: UserStatusEnum.ACTIVE,
                        allowNull: false,
                        references: {
                            model: DbTablesName.USER_STATUS,
                            key: 'id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'SET NULL'
                    },
                    photo_path: {
                        type: dataTypes.STRING(255),
                        allowNull: true
                    },
                    created_at: {
                        type: dataTypes.DATE,
                        allowNull: false
                    },
                    updated_at: {
                        type: dataTypes.DATE,
                        allowNull: true
                    }
                };
                await queryInterface.createTable(DbTablesName.USER, userModelAttributes as ModelAttributes, options);

                const groupModelAttributes: DBModelFieldInit<IGroupModel> = {
                    id: {
                        type: dataTypes.INTEGER(11),
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false
                    },
                    label: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    },
                    created_at: {
                        type: dataTypes.DATE,
                        allowNull: false
                    }
                };
                await queryInterface.createTable(DbTablesName.GROUP, groupModelAttributes as ModelAttributes, options);

                const userRoleModelAttributes: DBModelFieldInit<IUserRoleModel> = {
                    id: {
                        type: dataTypes.INTEGER(11),
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false
                    },
                    label: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    }
                };
                await queryInterface.createTable(DbTablesName.USER_ROLE, userRoleModelAttributes as ModelAttributes, options);

                const userStatusModelAttributes: DBModelFieldInit<IUserStatusModel> = {
                    id: {
                        type: dataTypes.INTEGER(11),
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false
                    },
                    status: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    }
                };
                await queryInterface.createTable(DbTablesName.USER_STATUS, userStatusModelAttributes as ModelAttributes, options);

                const oauthTokenModelAttributes: DBModelFieldInit<IOauthTokenModel> = {
                    id: {
                        type: dataTypes.INTEGER(11),
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false
                    },
                    user_id: {
                        type: dataTypes.INTEGER(11),
                        allowNull: false
                    },
                    access_token: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    },
                    refresh_token: {
                        type: dataTypes.STRING(255),
                        allowNull: false
                    }
                };
                await queryInterface.createTable(DbTablesName.OAUTH_TOKEN, oauthTokenModelAttributes as ModelAttributes, options);

                const userToGroupModelAttributes: DBModelFieldInit<IUserToGroupModel> = {
                    id: {
                        type: dataTypes.INTEGER(11),
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false
                    },
                    user_id: {
                        type: dataTypes.INTEGER(11),
                        allowNull: false
                    },
                    group_id: {
                        type: dataTypes.INTEGER(11),
                        allowNull: false
                    },
                    created_at: {
                        type: dataTypes.DATE,
                        allowNull: false
                    },
                    updated_at: {
                        type: dataTypes.DATE,
                        allowNull: true
                    }
                };
                await queryInterface.createTable(DbTablesName.USER_TO_GROUP, userToGroupModelAttributes as ModelAttributes, options);

                return Promise.resolve();
            };
            await migrationWrapper(migration);
        } catch (e) {
            console.log(`____________`);
            console.log(e.message);
            console.log(`____________`);

        }

    },

    down: async (queryInterface: QueryInterface, Sequelize: any) => {
        const migration = async (options: QueryOptions) => {
            await queryInterface.dropAllTables(options);
        };

        await migrationWrapper(migration);
    }
};
