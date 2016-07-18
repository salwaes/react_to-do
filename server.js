const env            = process.env.NODE_ENV || 'development';
const DEV            = env==='development';
const dotenv         = (DEV) ? require('dotenv').config() : undefined;

const express        = require('express');
const bodyParser     = require('body-parser');
const logger         = require('morgan');
const path           = require('path');

const app            = express();
const port           = process.env.PORT || process.argv[2] || 3000;

// const homeRoute      = require('./routes/home');
const tasksRoute     = require('./routes/tasks');


app.set('view engine','ejs');

app.use(logger(DEV ? 'dev' : 'common'));

app.use(bodyParser.json());

// app.use('/', homeRoute);
app.use('/tasks', tasksRoute);

app.use(express.static(path.join(__dirname,'dist')));

app.listen(port, () => {
  console.log('Server is listening on port ', port);
})
