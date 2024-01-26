// routes/tasks.js

const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

// Import your controller
const tasksController = require('../controller/tasksController');

// Protect the route with RBAC middleware
router.get('/tasks', rbacMiddleware.checkPermission('read_task'), tasksController.getAllTasks);

module.exports = router;