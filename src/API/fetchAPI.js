import axios from 'axios';
import removeUnderscore from '../utils/removeUnderscore';

const getTasks = async () => {
  const result = await axios.get('http://localhost:3000/tasks/');
  return removeUnderscore(result.data);
};

const postTask = async (newTask) => {
  const result = await axios.post('http://localhost:3000/tasks/', newTask);
  if (result.status === 201) {
    return true;
  }
  return false;
};

export { getTasks, postTask };
