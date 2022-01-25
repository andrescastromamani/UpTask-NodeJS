const passport = require('passport');

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