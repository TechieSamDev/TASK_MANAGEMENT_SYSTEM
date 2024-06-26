const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');

exports.getTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json({ tasks });
});

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });

  global.io.emit('newTask', task);
  res.json({ message: 'New Task Created', task });
});

exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  if (!task) return res.status(404).json({ message: 'Task not found' });

  global.io.emit('taskUpdate', task);
  res.json({ message: 'Task updated', task });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!task) return res.status(404).json({ message: 'Task not found' });

  global.io.emit('taskDelete', task);
  res.json({ status: 'success', message: 'Task deleted successfully' });
});
