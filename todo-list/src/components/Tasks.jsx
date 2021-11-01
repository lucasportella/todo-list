import React, { useEffect } from 'react';
import getTasks from '../API/fetchAPI';

const Tasks = () => {
  useEffect(async () => {
    const tasks = await getTasks();
    console.log(tasks);
  });

  return <div>Hello!</div>;
};

export default Tasks;
