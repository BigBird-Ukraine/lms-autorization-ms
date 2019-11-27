import * as sequelize from 'sequelize';
import { Sequelize } from 'sequelize';

import { config } from '../configs';

class DbProvider {
    db: Sequelize;

    constructor() {
        this.db = new (sequelize as any)(
            config.DATABASE_NAME,
            config.DATABASE_USER,
            config.DATABASE_PASS,
            {
                host: config.DATABASE_HOST,
                dialect: 'mysql',
                dialectOptions: { decimalNumbers: true }
            }
        );
    }
}

export const db = (new DbProvider()).db;
