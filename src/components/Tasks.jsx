import React, { useEffect, useContext, useState } from 'react';
import { removeTask } from '../API/fetchAPI';
import TasksContext from '../context/TasksContext';

const Tasks = () => {
  const {
    updateTasks, tasks, alertMessage, setAlertMessage,
  } = useContext(TasksContext);
  const [editModeTasks, setEditModeTasks] = useState([]);

  useEffect(async () => {
    await updateTasks();
  }, []);

  const handleDelete = async (id) => {
    const taskRemoved = await removeTask(id);
    if (taskRemoved) {
      setAlertMessage('Task removed!');
      await updateTasks();
    } else { setAlertMessage('Failed to remove task.'); }

    setTimeout(() => {
      setAlertMessage('');
    }, 4000);
  };

  const handleEditMode = (id) => {
    setEditModeTasks([...editModeTasks, id]);
  };

  const renderStandardMode = (task) => (
    <div key={task.id}>
      <div>{task.text}</div>
      <div>{task.date}</div>
      <div>{task.status}</div>
      <button onClick={() => handleEditMode(task.id)} type="button">Edit</button>
      <button onClick={() => handleDelete(task.id)} type="button">Remove</button>
    </div>
  );

  const generateTasks = () => tasks.map((task) => (editModeTasks.includes(task.id)
    ? <div>edit mode</div> : renderStandardMode(task)));

  return (
    <div>
      <div>{alertMessage}</div>
      {tasks ? generateTasks() : <div>Loading...</div>}
    </div>
  );
};

export default Tasks;
