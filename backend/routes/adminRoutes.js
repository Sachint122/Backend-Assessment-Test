const express = require('express');
const router = express.Router();
const { getAllUsers, getTasksByUserId } = require('../controllers/adminController');
const { auth, isManager } = require('../middlewares/authMiddleware');

router.get('/users', auth, isManager, getAllUsers);
router.get('/users/:id/tasks', auth, isManager, getTasksByUserId);

module.exports = router;
