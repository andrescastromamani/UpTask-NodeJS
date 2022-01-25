const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const routes = require('./routes');
const helpers = require('./helpers/helpers');
const passport = require('./config/passport');

//db connection
const db = require('./config/db');
require('./models/Project');
require('./models/Task');
require('./models/User');

db.sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

//Express
const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug'); // register the template engine
app.set('views', path.join(__dirname, './views')); // specify the views directory

//Flash
app.use(flash());
//Session
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
//vardump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.flash = req.flash();
    res.locals.user = req.user || null;
    next();
});
//Enable Body Parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes());
app.listen(3000);