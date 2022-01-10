const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
app.set('view engine', 'pug'); // register the template engine
app.set('views', path.join(__dirname, './views')); // specify the views directory

app.use('/', routes());
app.listen(3000);