const { StatusCodes } = require('http-status-codes');
const tasksService = require('../services/tasksService');

const getTasks = async (req, res) => {
  const result = await tasksService.getTasks();
  res.status(StatusCodes.OK).json(result);
};

const addTask = async (req, res) => {
  const { task, status } = req.body;
  const payload = { task, status };
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
  const { id, text, status } = req.body;
  const payload = { id, text, status };
  const result = await tasksService.editTask(payload);
  if (result.error) {
    return res.status(StatusCodes.BAD_REQUEST).json(result);
  }
  return res.status(StatusCodes.OK).json(result);
};

const getSortedTasks = async (req, res) => {
  const query = req.query.q;
  const sortOrder = Number(req.query.o);
  const payload = { query, sortOrder };
  const result = await tasksService.getSortedTasks(payload);
  return res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getTasks,
  addTask,
  removeTask,
  editTask,
  getSortedTasks,
};
