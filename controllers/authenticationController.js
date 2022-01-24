const passport = require('passport');

exports.auth = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    badRequestMessage: 'the email and password are required'
})