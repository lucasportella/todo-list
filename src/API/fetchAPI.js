import axios from 'axios';
import removeUnderscore from '../utils/removeUnderscore';

const baseEndPoint = 'http://localhost:3000/tasks/';

const getTasks = async () => {
  const result = await axios.get(baseEndPoint);
  return removeUnderscore(result.data);
};

const postTask = async (newTask) => {
  const result = await axios.post(baseEndPoint, newTask);
  if (result.status === 201) {
    return true;
  }
  return false;
};

const removeTask = async (id) => {
  const result = await axios.delete(baseEndPoint, { data: { id } });
  if (result.status === 200) {
    return true;
  }
  return false;
};

export { getTasks, postTask, removeTask };
