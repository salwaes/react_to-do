const router = require('express').Router();

const taskData = [];

router.get('/', (req,res) => {
  res.send(taskData);
})

router.post('/', (req,res) => {
  // res.send('new task page');
  taskData.push(req.body)
  res.json(taskData);
})

router.get('/:id', (req,res) => {
  res.send(`show task ${req.params.id}`);
})

router.put('/:id', (req,res) => {
  res.send(`edited task ${req.params.id}`);
})

router.delete('/:id', (req,res) => {
  res.send(`deleted task ${req.params.id}`);
})

module.exports = router
