const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getTasks = async () => {
  const db = await connection();
  return db.collection('tasks').find().toArray();
};

const addTask = async (payload) => {
  const db = await connection();
  const result = await db.collection('tasks').insertOne({ ...payload, date: new Date() });
  return result;
};

const removeTask = async (id) => {
  const db = await connection();
  return db.collection('tasks').deleteOne({ _id: ObjectId(id) });
};

const editTask = async (payload) => {
  const db = await connection();
  const { id, text, status } = payload;
  return db.collection('tasks').updateOne({ _id: ObjectId(id) }, { $set: { text, status } });
};

const getSortedTasks = async (payload) => {
  const db = await connection();
  const { query, sortOrder } = payload;
  const result = await db.collection('tasks').find().sort({ [query]: sortOrder }).toArray();
  return result;
};

module.exports = {
  getTasks,
  addTask,
  removeTask,
  editTask,
  getSortedTasks,
};
