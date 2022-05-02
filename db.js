const { Sequelize } = require('sequelize')



module.exports = sequelize = new Sequelize('postgres://pcdcnfhcyxjiiv:e70351d63988789cf1d17c7846c5de061aaa9ca4570a26a097f99552dd0810a8@ec2-52-71-69-66.compute-1.amazonaws.com:5432/d69lg051olv4ea', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});