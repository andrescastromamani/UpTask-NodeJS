const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uptasknode', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 33066,
    define: {
        timestamps: false
    }
});
module.exports = sequelize;