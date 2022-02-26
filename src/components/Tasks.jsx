import React, { useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { removeTask } from '../API/fetchAPI';
import TasksContext from '../context/TasksContext';
import EditMode from './EditMode';

function Tasks() {
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
    <Form key={task.id} className="Task">
      <div>{task.task}</div>
      <div>{task.date}</div>
      <div>{task.status}</div>
      <Button size="sm" className="buttons" onClick={() => handleEditMode(task.id)} type="button">Edit</Button>
      <Button size="sm" className="buttons" onClick={() => handleDelete(task.id)} type="button">Remove</Button>
    </Form>
  );

  const generateTasks = () => tasks.map((task) => (editModeTasks.includes(task.id)
    ? <EditMode data={task} key={task.id} /> : renderStandardMode(task)));

  return (
    <div className="tasksFather">
      <div>{alertMessage}</div>
      {tasks ? generateTasks() : <div>Loading...</div>}
    </div>
  );
}

export default Tasks;
