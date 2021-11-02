import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState();

  const contextValue = {
    tasks,
    setTasks,
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
