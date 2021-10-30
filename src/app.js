const express = require('express');
const tasksRoute = require('./routes/tasksRoute');

const app = express();

app.use(express.json());

app.use('/tasks', tasksRoute);

module.exports = app;
