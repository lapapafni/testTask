const { Sequelize } = require('sequelize')
const config = require('config')



module.exports = sequelize = new Sequelize(config.get('urlDb'), {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});