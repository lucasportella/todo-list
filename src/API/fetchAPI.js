import axios from 'axios';
import removeUnderscore from '../utils/removeUnderscore';

const baseEndpoint = 'https://mern-todo-list-backend.herokuapp.com/';
let endpoint = baseEndpoint;

const endpointTransporter = (endpointAttach) => {
  endpoint = `${baseEndpoint}${endpointAttach}`;
  console.log(endpoint);
};

const getTasks = async () => {
  const result = await axios.get(endpoint);
  return removeUnderscore(result.data);
};

const postTask = async (newTask) => {
  const result = await axios.post(baseEndpoint, newTask);
  if (result.status === 201) {
    return true;
  }
  return false;
};

const removeTask = async (id) => {
  const result = await axios.delete(baseEndpoint, { data: { id } });
  if (result.status === 200) {
    return true;
  }
  return false;
};

// different name pattern for the put function due to ambiguity
const fetchEditTask = async (editedTask) => {
  const result = await axios.put(baseEndpoint, editedTask);
  if (result.status === 200) {
    return true;
  }
  return false;
};

export {
  getTasks, postTask, removeTask, fetchEditTask, endpointTransporter,
};
