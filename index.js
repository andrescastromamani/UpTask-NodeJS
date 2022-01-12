const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//db connection
const db = require('./config/db');
require('./models/Project');
db.sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

//Express
const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug'); // register the template engine
app.set('views', path.join(__dirname, './views')); // specify the views directory

//Enable Body Parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes());
app.listen(3000);