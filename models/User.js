const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const db = require('../config/db');
const Project = require('./Project');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name is required'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: {
                msg: 'Email cannot be empty!'
            }
        },
        unique: {
            args: true,
            msg: 'Email already in use!'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password cannot be empty!'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});
User.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
//User.hasMany(Project);
module.exports = User;