'use strict'
const pg = require('pg-promise')({
// Initialization Options
});
const config = {
host:       process.env.DB_HOST,
port:       process.env.DB_PORT,
database:   process.env.DB_NAME,
user:       process.env.DB_USER,
password:   process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {
  getTasks(req, res, next) {
    _db.any("SELECT * FROM tasks;")
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.error('Error ',error);
      throw error;
    })
  },
  addTask(req, res, next) {
    console.log('=====', req.body)
    _db.any(`INSERT INTO tasks
      (task_name, task_desc)
      VALUES
      ($1, $2)
      returning *;`,
      [req.body.name, req.body.desc])
      .then( data => {
        console.log('ADDED TASK SUCCESSFUL')
        res.rows = data;
        next();
      })
      .catch( error => {
        console.error('ERROR in ADDING TASK!', error);
        throw error;
      })
  },
  updateTask(req, res, next) {

    req.body.tID = Number.parseInt(req.params.taskID);
    req.body.completed = !!req.body.completed;

    _db.one(`
      update tasks SET
      task_name = $/task_name/,
      task_desc = $/task_desc/,
      completed = $/completed/,
      task_time_start = $/task_time_start/,
      task_time_end = $/task_time_end/,
      where task_id = $/tID/
      returning *;`,
      req.body)

    .then( data => {
        console.log('UPDAtED TASK SUCCESSFUL')
        res.rows = data;
        next();
      })
      .catch( error => {
        console.error('ERROR in UPDATING TASK!', error);
        throw error;
      })
  },
  deleteTask(req, res, next) {
    req.body.tID = Number.parseInt(req.params.taskID);

    _db.none(`
      delete * from tasks
      where task_id = $1
     `, [tID])

    .then( data => {
        console.log('DELETED TASK SUCCESSFUL')
        res.rows = data;
        next();
      })
      .catch( error => {
        console.error('ERROR in DELETING TASK!', error);
        throw error;
      })
  },
}
