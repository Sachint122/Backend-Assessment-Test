const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getStats
} = require('../controllers/taskController');

const { auth } = require('../middlewares/authMiddleware');

router.use(auth);

router.post('/', createTask);

router.get('/', getTasks);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);
router.get('/stats', auth, getStats);
module.exports = router;
