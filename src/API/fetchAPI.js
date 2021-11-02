import axios from 'axios';

const getTasks = async () => axios.get('http://localhost:3000/tasks/');

const postTask = async (newTask) => {
  const result = await axios.post('http://localhost:3000/tasks/', newTask);
  if (result.status === 201) {
    return true;
  }
  return false;
};

export { getTasks, postTask };
