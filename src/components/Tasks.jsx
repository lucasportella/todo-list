import React, { useEffect, useContext } from 'react';
import { getTasks } from '../API/fetchAPI';
import TasksContext from '../context/TasksContext';

const Tasks = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  useEffect(async () => {
    const fetchTasks = await getTasks();
    setTasks(fetchTasks);
  }, []);

  const generateTasks = () => tasks.map((task) => (
    <div key={task.id}>
      <div>{task.text}</div>
      <div>{task.date}</div>
      <div>{task.status}</div>
    </div>
  ));

  return (<div>{tasks ? generateTasks() : <div>Loading...</div>}</div>);
};

export default Tasks;
