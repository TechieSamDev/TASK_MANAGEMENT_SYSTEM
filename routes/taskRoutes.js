const express = require('express');

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/').get(taskController.getTasks).post(taskController.createTask);
router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);
module.exports = router;
