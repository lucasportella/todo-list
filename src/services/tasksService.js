const tasksModel = require('../models/tasksModel');

const getTasks = async () => tasksModel.getTasks();

module.exports = {
  getTasks,
};
