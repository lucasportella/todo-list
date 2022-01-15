import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TasksContext from '../context/TasksContext';
import { fetchEditTask } from '../API/fetchAPI';

const EditMode = (props) => {
  const {
    data: {
      id, task, status,
    },
  } = props;

  const {
    updateTasks, setAlertMessage, alertMessageReset, editModeTasks, setEditModeTasks,
  } = useContext(TasksContext);

  const [editTask, setEditTask] = useState({ id, task, status });

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
    try {
      await fetchEditTask(editTask);
      setAlertMessage('Task edited!');
      await updateTasks();
    } catch (error) {
      setAlertMessage('Failed to edit task.');
    } finally {
      alertMessageReset();
      removeTaskFromEditMode();
    }
  };

  return (
    <form>
      <div>
      Task:
        <select onChange={handleChange} name="task" id="dropdown-task" value={editTask.task}>
          <option value="check emails">Check emails</option>
          <option value="take dog for a walk ">Take dog for a walk</option>
          <option value="wash the dishes">Wash the dishes</option>
          <option value="do the homework">Do the homework</option>
          <option value="pay my debt off">Pay my debt off</option>
          <option value="run a marathon">Run a marathon</option>
          <option value="propose to girlfriend">Propose to girlfriend</option>
          <option value="fix my car">Fix my car</option>
          <option value="change light bulb">Change light bulb</option>
        </select>
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
  );
};

EditMode.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditMode;
