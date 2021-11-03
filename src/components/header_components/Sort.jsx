import React, { useContext, useState } from 'react';
import { endpointTransporter } from '../../API/fetchAPI';
import TasksContext from '../../context/TasksContext';

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

  const renderSortButton = () => (<div><button type="button" onClick={handleSortMode}>Sort</button></div>);

  const renderSortMode = () => (
    <div>
      <form>
        <select defaultValue={sortMethod} onChange={handleSortMethod} name="sort-method">
          <option value="text">Text</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
      </form>
      <form>
        <label htmlFor="asc-sort-order">
          Asc
          <input
            onClick={handleSortOrder}
            type="radio"
            value="1"
            defaultChecked={sortOrder === '1'}
            name="sort-order"
            id="asc-sort-order"
          />
        </label>
        <label htmlFor="desc-sort-order">
          Desc
          <input
            onClick={handleSortOrder}
            type="radio"
            value="-1"
            defaultChecked={sortOrder === '-1'}
            name="sort-order"
            id="desc-sort-order"
          />
        </label>
        <button type="button" onClick={handleSort}>Sort</button>
        <button type="button" onClick={handleSortMode}>Cancel</button>
      </form>
    </div>
  );

  return (
    <div>
      {sortMode ? renderSortMode() : renderSortButton()}
    </div>
  );
};

export default Sort;
