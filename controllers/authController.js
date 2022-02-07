const User = require('../models/User');
const sendEmail = require('../handlers/email');

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
        //url confirm account
        const confirmUrl = `http://${req.headers.host}/auth/confirm/${email}`;
        //send email
        const user = {
            email
        }
        await sendEmail.send({
            user,
            subject: 'Confirm your account',
            confirmUrl,
            file: 'confirmAccount'
        })
        req.flash('correct', 'We send you an email to confirm your account');
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
exports.login = (req, res) => {
    const { error } = res.locals.flash;
    res.render('auth/login', {
        nameProject: 'UpTask - Login',
        error: error
    });
}

exports.forgot = (req, res) => {
    res.render('auth/forgot', {
        nameProject: 'UpTask - Forgot'
    });
}

exports.confirm = async (req, res) => {
    //res.json(req.params.email);
    const user = await User.findOne({
        where: {
            email: req.params.email
        }
    });
    if (!user) {
        req.flash('error', 'User not found');
        res.redirect('/auth/register');
    }
    user.active = 1;
    await user.save();
    req.flash('correct', 'Your account has been confirmed');
    res.redirect('/auth/login');
}

