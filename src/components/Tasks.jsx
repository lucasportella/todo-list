import React, { useEffect, useState } from 'react';
import { getTasks } from '../API/fetchAPI';
import removeUnderscore from '../utils/removeUnderscore';

const Tasks = () => {
  const [tasks, setTasks] = useState();
  console.log(tasks);

  useEffect(async () => {
    const fetch = await getTasks();
    const parsedData = removeUnderscore(fetch.data);
    setTasks(parsedData);
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
