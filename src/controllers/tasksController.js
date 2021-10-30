const { StatusCodes } = require('http-status-codes');
const tasksModel = require('../models/tasksModel');

const getTasks = async (req, res) => {
  const result = await tasksModel.getTasks();
  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getTasks,
};
