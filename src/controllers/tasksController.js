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
    return res.status(StatusCodes.BAD_REQUEST).json(result.error.message);
  }
  return res.status(StatusCodes.CREATED).json(result);
};

module.exports = {
  getTasks,
  addTask,
};
