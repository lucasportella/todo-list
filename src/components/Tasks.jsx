import React, { useEffect, useContext } from 'react';
import { removeTask } from '../API/fetchAPI';
import TasksContext from '../context/TasksContext';

const Tasks = () => {
  const {
    updateTasks, tasks, alertMessage, setAlertMessage,
  } = useContext(TasksContext);

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

  const handleEditMode = () => {

  };

  const generateTasks = () => tasks.map((task) => (
    <div key={task.id}>
      <div>{task.text}</div>
      <div>{task.date}</div>
      <div>{task.status}</div>
      <button onClick={handleEditMode} type="button">Edit</button>
      <button onClick={() => handleDelete(task.id)} type="button">Remove</button>
    </div>
  ));

  return (
    <div>
      <div>{alertMessage}</div>
      {tasks ? generateTasks() : <div>Loading...</div>}
    </div>
  );
};

export default Tasks;
