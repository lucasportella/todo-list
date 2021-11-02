import React, { useState } from 'react';
import { postTask } from '../../API/fetchAPI';

const NewTask = () => {
  const [newTaskMode, setNewTaskMode] = useState(false);
  const [newTask, setNewTask] = useState({ status: 'pending', text: '' });

  const handleClick = () => setNewTaskMode(!newTaskMode);

  const handleChange = ({ target: { name, value } }) => {
    setNewTask({ ...newTask, [name]: value });
  };

  const handleClickAndSubmit = async () => {
    await postTask(newTask);
    setNewTaskMode(!newTaskMode);
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

  return newTaskMode ? renderNewTaskMode() : renderNewTaskButton();
};

export default NewTask;
