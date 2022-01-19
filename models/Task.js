const { Sequelize } = require('sequelize');
const db = require('../config/db');
const Project = require('./Project');


const Task = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING(1),
    }
});
Task.belongsTo(Project);
module.exports = Task;