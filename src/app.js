const express = require('express');
// const cors = require('cors');
const tasksRoute = require('./routes/tasksRoute');

const app = express();

app.use(express.json());

// regex pattern in origin to fit cors policy, this allows communication between any localhost ports
// app.use(cors({
//   origin: 'https://mern-todo-list-backend.herokuapp.com/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

app.use('/tasks', tasksRoute);

module.exports = app;
