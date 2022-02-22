/* eslint-disable no-underscore-dangle */
const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const data = require('../data');
const tasksModel = require('../../models/tasksModel');

describe('Test taskModel', () => {
  let connectionMock;
  let db;
  const DBServer = new MongoMemoryServer();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  beforeEach(async () => {
    db = connectionMock.db('todo_list');
    await db.collection('tasks').deleteMany({});
  });

  describe('Test getTask function', () => {
    it('successfully returns and empty array if the database is empty', async () => {
      const response = await tasksModel.getTasks();
      expect(response).to.be.a('array');
      expect(response).to.have.lengthOf(0);
    });

    it('successfully gets all tasks', async () => {
      db.collection('tasks').insertMany(data);
      const response = await tasksModel.getTasks();
      expect(response).to.be.a('array');
      expect(response).to.have.lengthOf(3);
      response.forEach((task) => {
        expect(task).to.be.a('object');
        const symbol = Reflect.ownKeys(task._id)[0];
        expect(symbol).to.be.a('symbol');
        expect(task).to.have.all.keys('_id', 'task', 'status', 'date');
      });
    });
  });

  describe('Test addTask function', () => {
    it('successfully adds a new task', async () => {
      const task = { task: 'Plant potatoes', status: 'pending' };
      const response = await tasksModel.addTask(task);
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys('acknowledged', 'insertedId');
      expect(response).to.include({ acknowledged: true });
      expect(response.insertedId).to.be.a('object');
    });
  });

  describe('Test removeTask function', () => {
    beforeEach(async () => {
      db = connectionMock.db('todo_list');
      db.collection('tasks').insertMany(data);
    });

    afterEach(async () => {
      db = connectionMock.db('todo_list');
      db.collection('tasks').deleteMany();
    });

    it('successfully removes a task', async () => {
      const { _id } = await db.collection('tasks').findOne();
      const idString = _id.toString();
      const response = await tasksModel.removeTask(idString);
      expect(response).to.be.a('object');
      expect(response).to.deep.equal({ acknowledged: true, deletedCount: 1 });
      const task = await db.collection('tasks').findOne();
      expect(task._id).to.not.equal(_id);
    });

    it('successfully removes all tasks', async () => {
      let tasks = await db.collection('tasks').find().toArray();
      expect(tasks).to.have.lengthOf(3);
      await Promise.all(tasks.map((task) => {
        const idString = task._id.toString();
        return tasksModel.removeTask(idString);
      }));
      tasks = await db.collection('tasks').find().toArray();
      expect(tasks).to.be.a('array');
      expect(tasks).to.have.lengthOf(0);
    });
  });
});
