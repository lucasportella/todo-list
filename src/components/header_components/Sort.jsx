import React, { useContext } from 'react';
import { endpointTransporter } from '../../API/fetchAPI';
import TasksContext from '../../context/TasksContext';

const Sort = () => {
  const { updateTasks } = useContext(TasksContext);
  const handleChange = async ({ target: { value } }) => {
    if (value === 'default') {
      endpointTransporter('');
      await updateTasks();
    } else {
      endpointTransporter(`sort/?q=${value}&o=1`);
      await updateTasks();
    }
  };

  return (
    <div>
      Sort:
      <form>
        <select onChange={handleChange} name="sort-method">
          <option value="text">Text</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
          <option value="default">Default</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
