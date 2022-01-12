const { Sequelize } = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
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
}, {
    hooks: {
        beforeCreate: (project) => {
            const url = slug(project.name).toLowerCase();
            project.url = `${url}-${shortid.generate()}`;
        }
    }
});
module.exports = Project;