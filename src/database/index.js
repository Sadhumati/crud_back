import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfigProd from '../config/database-prod';
import databaseConfigDev from '../config/database-dev';

const models = [
    User,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        const databaseConfig = process.env.NODE_ENV === 'development' ? databaseConfigProd : databaseConfigDev;

        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models),
            );
    }
}

export default new Database();