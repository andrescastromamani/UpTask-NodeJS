const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');
const helpers = require('./helpers/helpers');

//db connection
const db = require('./config/db');
require('./models/Project');
require('./models/Task');
db.sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

//Express
const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug'); // register the template engine
app.set('views', path.join(__dirname, './views')); // specify the views directory

//vardump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});
//Enable Body Parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes());
app.listen(3000);