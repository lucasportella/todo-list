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
      <span>
        <button type="button" onClick={() => handleClickAndSubmit()}>Confirm</button>
        <button type="button" onClick={() => handleClick()}>Cancel</button>
      </span>
    </form>
  );

  return newTaskMode ? renderNewTaskButton() : renderNewTaskMode();
};

export default NewTask;
