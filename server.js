const env            = process.env.NODE_ENV || 'development';
const DEV            = env==='development';
const dotenv         = (DEV) ? require('dotenv').config() : undefined;

const express        = require('express');
const bodyParser     = require('body-parser');
const logger         = require('morgan');
const path           = require('path');

const app            = express();
const port           = process.env.PORT || process.argv[2] || 3009;

const homeRoute      = require('./routes/home');
const tasksRoute     = require('./routes/tasks');


app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));

app.use(bodyParser.json());

app.use('/', homeRoute);
app.use('/tasks', tasksRoute);

app.listen(port, () => {
  console.log('Server is listening on port ', port);
})
