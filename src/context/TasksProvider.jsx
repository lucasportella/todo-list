import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';
import { getTasks } from '../API/fetchAPI';

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState();
  const [alertMessage, setAlertMessage] = useState('');

  const updateTasks = async () => {
    const fetchTasks = await getTasks();
    setTasks(fetchTasks);
  };

  const contextValue = {
    updateTasks,
    tasks,
    setTasks,
    alertMessage,
    setAlertMessage,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TasksProvider;
