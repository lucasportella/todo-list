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

  // beforeEach technique https://github1s.com/tryber/sd-09-store-manager/pull/3

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
        expect(task).to.have.all.keys('_id', 'name', 'status', 'date');
      });
    });
  });

  describe('Test addTask function', () => {
    it('successfully adds a new task', async () => {
      const task = { name: 'Plant potatoes', status: 'pending' };
      const response = await tasksModel.addTask(task);
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys('acknowledged', 'insertedId');
      expect(response).to.include({ acknowledged: true });
      expect(response.insertedId).to.be.a('object');
    });
  });
});
