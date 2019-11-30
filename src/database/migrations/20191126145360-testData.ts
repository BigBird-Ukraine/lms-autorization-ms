// tslint:disable max-line-length
// tslint:disable tsr-detect-sql-literal-injection
import { QueryInterface, QueryOptions } from 'sequelize';

import { DbTablesName } from '../constants';
import { migrationWrapper } from '../transactions';

export default {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    const migration = async (options: QueryOptions) => {

      // #####################################
      // ROLE TEST DATA
      // #####################################
      await queryInterface.sequelize.query(`INSERT INTO ${DbTablesName.USER_ROLE} (id, label) VALUES (1, 'Admin')`, options);
      await queryInterface.sequelize.query(`INSERT INTO ${DbTablesName.USER_ROLE} (id, label) VALUES (2, 'Teacher')`, options);
      await queryInterface.sequelize.query(`INSERT INTO ${DbTablesName.USER_ROLE} (id, label) VALUES (3, 'Student')`, options);

      // #####################################
      // USER_STATUS TEST DATA
      // #####################################
      await queryInterface.sequelize.query(`INSERT INTO ${DbTablesName.USER_STATUS} (id, status) VALUES (1, 'Active')`, options);
      await queryInterface.sequelize.query(`INSERT INTO ${DbTablesName.USER_STATUS} (id, status) VALUES (2, 'Blocked')`, options);

      return Promise.resolve();
    };
    await migrationWrapper(migration);
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    const migration = async (options: QueryOptions) => {
      await queryInterface.sequelize.query(`TRUNCATE TABLE ${DbTablesName.USER_ROLE}`, options);
      await queryInterface.sequelize.query(`TRUNCATE TABLE ${DbTablesName.USER_STATUS}`, options);
    };

    await migrationWrapper(migration);
  }
};
