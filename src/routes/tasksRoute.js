const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/', tasksController.getTasks);
router.post('/', tasksController.addTask);

module.exports = router;
