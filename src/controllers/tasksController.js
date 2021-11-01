const { StatusCodes } = require('http-status-codes');
const tasksService = require('../services/tasksService');

const getTasks = async (req, res) => {
  const result = await tasksService.getTasks();
  res.status(StatusCodes.OK).json(result);
};

const addTask = async (req, res) => {
  const { name, status } = req.body;
  const payload = { name, status };
  const result = await tasksService.addTask(payload);
  if (result.error) {
    return res.status(StatusCodes.BAD_REQUEST).json(result);
  }
  return res.status(StatusCodes.CREATED).json(result);
};

const removeTask = async (req, res) => {
  const { id } = req.body;
  const result = await tasksService.removeTask(id);
  if (result.error) {
    return res.status(StatusCodes.BAD_REQUEST).json(result);
  }
  return res.status(StatusCodes.OK).json(result);
};

const editTask = async (req, res) => {
  const { id, status } = req.body;
  const payload = { id, status };
  const result = await tasksService.editTask(payload);
  return res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getTasks,
  addTask,
  removeTask,
  editTask,
};
