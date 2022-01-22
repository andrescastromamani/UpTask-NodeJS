const User = require('../models/User');

exports.register = (req, res) => {
    res.render('auth/register', {
        nameProject: 'UpTask - Register',
    });
}
exports.store = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name,
            email,
            password
        });
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('auth/register', {
            nameProject: 'UpTask - Register',
            flash: req.flash(),
            name: name,
            email: email,
            password: password
        })
    }
}