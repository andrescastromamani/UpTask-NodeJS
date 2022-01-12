const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Project = db.define('projects', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
    },
    url: {
        type: Sequelize.STRING,
    }
});
module.exports = Project;