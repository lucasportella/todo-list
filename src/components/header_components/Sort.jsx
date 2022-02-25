import React, { useContext, useState } from 'react';
import { endpointTransporter } from '../../API/fetchAPI';
import TasksContext from '../../context/TasksContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Sort = () => {
  const { updateTasks, setAlertMessage, alertMessageReset } = useContext(TasksContext);
  const [sortMode, setSortMode] = useState(false);
  const [sortMethod, setSortMethod] = useState('date');
  const [sortOrder, setSortOrder] = useState('1');

  const handleSortMode = () => setSortMode(!sortMode);

  const handleSortMethod = async ({ target: { value } }) => {
    setSortMethod(value);
  };

  const handleSortOrder = async ({ target: { value } }) => {
    setSortOrder(value);
  };

  const handleSort = async () => {
    endpointTransporter(`sort/?q=${sortMethod}&o=${sortOrder}`);
    await updateTasks();
    handleSortMode();
    setAlertMessage('Sorted!');
    alertMessageReset();
  };

  const renderSortButton = () => (<div><Button size="sm" type="button" onClick={handleSortMode}>Sort</Button></div>);

  const renderSortMode = () => (
    <Form>
        <Form.Control as="select"defaultValue={sortMethod} onChange={handleSortMethod} name="sort-method">
          <option value="task">Task</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </Form.Control>

      <Form>
        <Form.Label htmlFor="asc-sort-order">
          Asc
          <Form.Check
            onClick={handleSortOrder}
            type="radio"
            value="1"
            defaultChecked={sortOrder === '1'}
            name="sort-order"
            id="asc-sort-order"
          />
        </Form.Label>
        <Form.Label htmlFor="desc-sort-order">
          Desc
          <Form.Check
            onClick={handleSortOrder}
            type="radio"
            value="-1"
            defaultChecked={sortOrder === '-1'}
            name="sort-order"
            id="desc-sort-order"
          />
        </Form.Label>
        <div className= 'btn'>
        <Button size="sm" type="button" onClick={handleSort}>Sort</Button>
        <Button size="sm" type="button" onClick={handleSortMode}>Cancel</Button>
        </div>
      </Form>
    </Form>
  );

  return (
    <div className="buttonHolder">
      {sortMode ? renderSortMode() : renderSortButton()}
    </div>
  );
};

export default Sort;
