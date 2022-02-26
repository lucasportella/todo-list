import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postTask } from '../../API/fetchAPI';
import TasksContext from '../../context/TasksContext';

function NewTask() {
  const { updateTasks, setAlertMessage, alertMessageReset } = useContext(TasksContext);
  const [newTaskMode, setNewTaskMode] = useState(false);
  const [newTask, setNewTask] = useState({
    status: 'pending',
    task: 'check emails',
  });

  const handleClick = () => setNewTaskMode(!newTaskMode);

  const handleChange = ({ target: { name, value } }) => {
    setNewTask({ ...newTask, [name]: value });
  };

  const handleClickAndSubmit = async () => {
    try {
      await postTask(newTask);
      setAlertMessage('New task created!');
      await updateTasks();
    } catch (error) {
      setAlertMessage('Failed to create new task.');
    } finally {
      setNewTaskMode(!newTaskMode);
      alertMessageReset();
    }
  };

  const renderNewTaskButton = () => (
    <span>
      <Button size="sm" type="button" onClick={handleClick}>
        New Task
      </Button>
    </span>
  );

  const renderNewTaskMode = () => (
    <div className="newTaskAndHeader">
      <Form.Group>
        <h5>Task</h5>
        <Form.Control
          as="select"
          onChange={handleChange}
          name="task"
          id="dropdown-task"
        >
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
      </Form.Group>
      <div>
        <h6 className="taskAndStatus">Task status</h6>
        <Form.Control
          as="select"
          onChange={handleChange}
          name="status"
          id="dropdown-status"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </Form.Control>
      </div>
      <span>
        <Button type="button" size="sm" onClick={handleClickAndSubmit}>
          Confirm
        </Button>
        <Button type="button" size="sm" onClick={handleClick}>
          Cancel
        </Button>
      </span>
    </div>
  );

  return (
    <div className="buttonHolder">
      {newTaskMode ? renderNewTaskMode() : renderNewTaskButton()}
    </div>
  );
}

export default NewTask;
