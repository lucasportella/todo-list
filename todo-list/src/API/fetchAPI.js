import axios from 'axios';

const getTasks = async () => {
  const tasks = await axios.get('http://localhost:3000/tasks/');
  console.log(tasks);
};

export default getTasks;
