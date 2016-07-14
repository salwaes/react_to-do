const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
const app            = express();
const port           = process.env.PORT || process.argv[2] || 3009;

const homeRoute      = require('./routes/home');
const tasksRoute     = require('./routes/tasks');


app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));

app.use('/', homeRoute);
app.use('/tasks', tasksRoute);

app.listen(port, () => {
  console.log('Server is listening on port ', port);
})
