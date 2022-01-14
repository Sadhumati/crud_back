import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init({
            tax_id: Sequelize.STRING,
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            active: Sequelize.BOOLEAN,
        }, {
            sequelize,
        }, );

        return this;
    }
}

export default User;