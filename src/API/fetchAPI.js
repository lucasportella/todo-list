import axios from 'axios';

const getTasks = async () => axios.get('http://localhost:3000/tasks/');

const postTask = async (newTask) => {
  const result = await axios.post('http://localhost:3000/tasks/', newTask);
  console.log(result);
};

export { getTasks, postTask };
