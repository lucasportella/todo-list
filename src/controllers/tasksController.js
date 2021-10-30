const { StatusCodes } = require('http-status-codes');
const tasksService = require('../services/tasksService');

const getTasks = async (req, res) => {
  const result = await tasksService.getTasks();
  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getTasks,
};
