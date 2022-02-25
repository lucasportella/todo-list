import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TasksContext from '../context/TasksContext';
import { fetchEditTask } from '../API/fetchAPI';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Container } from 'react-bootstrap';

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
    <div className='editTask'>
    <Form>
      <div>
      Task:
        <Form.Control as="select" onChange={handleChange} name="task" id="dropdown-task" value={editTask.task}>
          <option value="check emails">Check emails</option>
          <option value="take dog for a walk ">Take dog for a walk</option>
          <option value="wash the dishes">Wash the dishes</option>
          <option value="do the homework">Do the homework</option>
          <option value="pay my debt off">Pay my debt off</option>
          <option value="run a marathon">Run a marathon</option>
          <option value="propose to girlfriend">Propose to girlfriend</option>
          <option value="fix my car">Fix my car</option>
          <option value="change light bulb">Change light bulb</option>
        </Form.Control>
      </div>
      <div>
        Task status:

        <Form.Control as="select" onChange={handleChange} name="status" id="dropdown-status" value={editTask.status}>
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </Form.Control>

      </div>
      <span>
        <Button size="sm" className="buttons" type="button" onClick={confirmEdit}>Confirm</Button>
        <Button size="sm" className="buttons" type="button" onClick={cancelEdit}>Cancel</Button>
      </span>
    </Form>
    </div>
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
