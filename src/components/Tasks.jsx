import React, { useEffect, useContext } from 'react';
import { removeTask } from '../API/fetchAPI';
import TasksContext from '../context/TasksContext';
import EditMode from './EditMode';

const Tasks = () => {
  const {
    updateTasks,
    tasks,
    alertMessage,
    setAlertMessage,
    alertMessageReset,
    editModeTasks,
    setEditModeTasks,
  } = useContext(TasksContext);

  useEffect(async () => {
    await updateTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      setAlertMessage('Task removed!');
      await updateTasks();
    } catch (error) {
      setAlertMessage('Failed to remove task.');
    } finally {
      alertMessageReset();
    }
  };

  const handleEditMode = (id) => {
    setEditModeTasks([...editModeTasks, id]);
  };

  const renderStandardMode = (task) => (
    <div key={task.id}>
      <div>{task.task}</div>
      <div>{task.date}</div>
      <div>{task.status}</div>
      <button onClick={() => handleEditMode(task.id)} type="button">Edit</button>
      <button onClick={() => handleDelete(task.id)} type="button">Remove</button>
    </div>
  );

  const generateTasks = () => tasks.map((task) => (editModeTasks.includes(task.id)
    ? <EditMode data={task} key={task.id} /> : renderStandardMode(task)));

  return (
    <div>
      <div>{alertMessage}</div>
      {tasks ? generateTasks() : <div>Loading...</div>}
    </div>
  );
};

export default Tasks;
