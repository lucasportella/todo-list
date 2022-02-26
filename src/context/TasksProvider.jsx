import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';
import { getTasks } from '../API/fetchAPI';

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState();
  const [editModeTasks, setEditModeTasks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const updateTasks = async () => {
    const fetchTasks = await getTasks();
    setTasks(fetchTasks);
  };

  const alertMessageReset = () => {
    setTimeout(() => {
      setAlertMessage('');
    }, 4000);
  };

  const contextValue = {
    updateTasks,
    tasks,
    setTasks,
    editModeTasks,
    setEditModeTasks,
    alertMessage,
    setAlertMessage,
    alertMessageReset,
  };
  const memoContextValues = useMemo(() => contextValue, [contextValue]);

  return (
    <TasksContext.Provider value={memoContextValues}>
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TasksProvider;
