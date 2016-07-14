const router = require('express').Router();

const db     = require('../models/task.js');

router.get('/', db.getTasks, (req,res) => {
  res.json(res.rows);
})

router.post('/', db.addTask, (req,res) => {
  // res.send('new task page');
  // taskData.push(req.body)
  res.json(res.rows);
})

// router.get('/:id', (req,res) => {
//   res.send(`show task ${req.params.id}`);
// })

router.put('/:id', db.updateTask, (req,res) => {
  res.json(res.rows);
})

router.delete('/:id', db.deleteTask, (req,res) => {
  res.send(req.params.taskId);
})

module.exports = router
