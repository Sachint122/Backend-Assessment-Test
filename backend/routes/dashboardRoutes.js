const express = require('express');
const router = express.Router();
const { getUserStats, getManagerStats } = require('../controllers/taskController');
const { auth, isManager } = require('../middlewares/authMiddleware');

router.get('/user', auth, getUserStats);

router.get('/manager', auth, isManager, getManagerStats);

module.exports = router;
