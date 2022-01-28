const passport = require('passport');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/User');
const { log } = require('console');

exports.auth = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    badRequestMessage: 'the email and password are required'
})

exports.userAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

exports.logout = (req, res) => {
    //console.log(req.user);
    req.logout();
    res.redirect('/');
}

exports.sendToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        req.flash('error', 'User not found');
        res.redirect('/auth/forgot');
    }
    //token generate
    user.token = crypto.randomBytes(20).toString('hex');
    user.expired = Date.now() + 3600000;
    await user.save();
    res.redirect(`http://${req.headers.host}/auth/forgot/${user.token}`);
}
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne(
        {
            where: { token }
        }
    )
    if (!user) {
        req.flash('error', 'Token invalid or expired');
        res.redirect('/auth/forgot');
    }
    res.render('auth/reset', {
        nameProject: 'UpTask - Reset Password',
        token: token
    });
}
exports.reset = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
        where: {
            token,
            expired: {
                [Op.gte]: Date.now()
            }
        }
    });

    //verify user exist
    if (!user) {
        req.flash('error', 'Token invalid or expired');
        res.redirect('/auth/forgot');
    }
    if (password.length < 6) {
        req.flash('error', 'Password must be at least 6 characters');
        res.redirect(`/auth/forgot/${token}`);
    }
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    user.token = null;
    user.expired = null;
    await user.save();
    req.flash('correct', 'Password changed successfully');
    res.redirect('/auth/login');
}