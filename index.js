const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug'); // register the template engine
app.set('views', path.join(__dirname, './views')); // specify the views directory

//Enable Body Parser for POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes());
app.listen(3000);