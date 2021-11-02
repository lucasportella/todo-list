import React, { useState, useContext } from 'react';
import { getTasks, postTask } from '../../API/fetchAPI';
import TasksContext from '../../context/TasksContext';

const NewTask = () => {
  const { setTasks } = useContext(TasksContext);
  const [newTaskMode, setNewTaskMode] = useState(false);
  const [newTask, setNewTask] = useState({ status: 'pending', text: '' });
  const [alertMessage, setAlertMessage] = useState('');

  const handleClick = () => setNewTaskMode(!newTaskMode);

  const handleChange = ({ target: { name, value } }) => {
    setNewTask({ ...newTask, [name]: value });
  };

  const handleClickAndSubmit = async () => {
    const taskCreated = await postTask(newTask);
    setNewTaskMode(!newTaskMode);
    const fetchTasks = await getTasks();
    setTasks(fetchTasks);

    if (taskCreated) {
      setAlertMessage('New task created!');
    } else { setAlertMessage('Failed to create new task.'); }

    setTimeout(() => {
      setAlertMessage('');
    }, 4000);
  };

  const renderNewTaskButton = () => (
    <span><button type="button" onClick={handleClick}>New Task</button></span>
  );

  const renderNewTaskMode = () => (

    <form>
      <div>
        <label htmlFor="task-text">
          Task text:
          <input onChange={handleChange} name="text" id="task-text" />
        </label>
      </div>
      <div>
        Task status:
        <select onChange={handleChange} name="status" id="dropdown-status">
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <span>
        <button type="button" onClick={handleClickAndSubmit}>Confirm</button>
        <button type="button" onClick={handleClick}>Cancel</button>
      </span>
    </form>

  );

  return (
    <div>
      <div>{alertMessage}</div>
      {newTaskMode ? renderNewTaskMode() : renderNewTaskButton()}
    </div>
  );
};

export default NewTask;
