import React, { useState } from 'react';

const NewTask = () => {
  const [newTaskMode, setNewTaskMode] = useState(false);

  const handleClick = () => setNewTaskMode(!newTaskMode);

  const handleClickAndSubmit = () => {
    setNewTaskMode(!newTaskMode);
  };

  const renderNewTaskButton = () => (
    <span><button type="button" onClick={() => handleClick()}>New Task</button></span>
  );

  const renderNewTaskMode = () => (
    <form>
      <div>
        <label htmlFor="task-text">
          Task text:
          <input id="task-text" />
        </label>
      </div>
      <div>
        Task status:
        <select name="status" id="dropdown-status">
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <span>
        <button type="button" onClick={() => handleClickAndSubmit()}>Confirm</button>
        <button type="button" onClick={() => handleClick()}>Cancel</button>
      </span>
    </form>
  );

  return newTaskMode ? renderNewTaskButton() : renderNewTaskMode();
};

export default NewTask;
