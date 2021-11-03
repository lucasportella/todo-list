import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TasksContext from '../context/TasksContext';
import { fetchEditTask } from '../API/fetchAPI';

const EditMode = (props) => {
  const {
    data: {
      id, text, status,
    },
  } = props;
  const {
    updateTasks, setAlertMessage, editModeTasks, setEditModeTasks,
  } = useContext(TasksContext);
  const [editTask, setEditTask] = useState({ id, text, status });

  const handleChange = ({ target: { name, value } }) => {
    setEditTask({ ...editTask, [name]: value });
  };

  const removeTaskFromEditMode = () => {
    const updatedEditModeTasks = editModeTasks.filter((taskId) => taskId !== id);
    setEditModeTasks(updatedEditModeTasks);
  };

  const cancelEdit = () => {
    removeTaskFromEditMode();
  };

  const confirmEdit = async () => {
    const taskEdited = await fetchEditTask(editTask);
    if (taskEdited) {
      setAlertMessage('Task edited!');
      await updateTasks();
    } else { setAlertMessage('Failed to edit task.'); }
    removeTaskFromEditMode();
  };

  return (
    <div key={id}>
      <form>
        <div>
          <label htmlFor="task-text">
            Task text:
            <input onChange={handleChange} name="text" id="task-text" value={editTask.text} />
          </label>
        </div>
        <div>
          Task status:
          <select onChange={handleChange} name="status" id="dropdown-status" value={editTask.status}>
            <option value="pending">Pending</option>
            <option value="in progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <span>
          <button type="button" onClick={confirmEdit}>Confirm</button>
          <button type="button" onClick={cancelEdit}>Cancel</button>
        </span>
      </form>
    </div>
  );
};

EditMode.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditMode;
