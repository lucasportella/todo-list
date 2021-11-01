const tasksModel = require('../models/tasksModel');

const getTasks = async () => tasksModel.getTasks();

const addTask = async (payload) => {
  const result = await tasksModel.addTask(payload);
  if (result.acknowledged) {
    return result;
  }
  return { error: { errorType: 'add new task failed', message: 'it was not possible to add a new task in the database' } };
};

const removeTask = async (id) => {
  const result = await tasksModel.removeTask(id);
  if (result.acknowledged && result.deletedCount === 1) {
    return result;
  }
  return { error: { errorType: 'remove task failed', message: 'it was not possible to remove the selected task in the database' } };
};

const editTask = async (payload) => {
  const result = await tasksModel.editTask(payload);
  if (result.modifiedCount === 1) {
    return result;
  }
  return { error: { errorType: 'edit task failed', message: 'it was not possible to edit the selected task in the database' } };
};

const getSortedTasks = (payload) => tasksModel.getSortedTasks(payload);

module.exports = {
  getTasks,
  addTask,
  removeTask,
  editTask,
  getSortedTasks,
};
