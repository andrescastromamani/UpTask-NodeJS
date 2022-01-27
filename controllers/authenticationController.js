const passport = require('passport');
const crypto = require('crypto');

const User = require('../models/User');

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
    const user = await User.findOne(
        {
            where: { email }
        }
    );
    if (!user) {
        console.log('User not found');
        req.flash('error', 'User not found');
        res.redirect('/auth/forgot');
    }
    //token generate
    user.token = crypto.randomBytes(20).toString('hex');
    user.expired = Date.now() + 3600000;
    await user.save();
    const resetUrl = `http://${req.headers.host}/auth/forgot/${user.token}`;
}
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne(
        {
            where: { token }
        }
    )
    console.log(user);
}