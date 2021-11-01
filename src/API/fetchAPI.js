import axios from 'axios';

const getTasks = async () => axios.get('http://localhost:3000/tasks/');

export default getTasks;
