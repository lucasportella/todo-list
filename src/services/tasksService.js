const tasksModel = require('../models/tasksModel');

const getTasks = async () => tasksModel.getTasks();

const addTask = async (payload) => {
  const result = await tasksModel.addTask(payload);
  if (result.acknowledged) {
    return result;
  }
  return { error: { errorType: 'operation failed', message: 'it was not possible to add a new task in the database' } };
};

module.exports = {
  getTasks,
  addTask,
};
