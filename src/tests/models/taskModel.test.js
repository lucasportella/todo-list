const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const data = require('../data');
const tasksModel = require('../../models/tasksModel');

describe('Test taskModel', () => {
  const DBServer = new MongoMemoryServer();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Test taskModel CRUD', () => {
    it('adds a new task', async () => {
      const task = { name: 'Plant potatoes', status: 'pending' };
      const response = await tasksModel.addTask(task);
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys('acknowledged', 'insertedId');
      expect(response).to.include({ acknowledged: true });
      expect(response.insertedId).to.be.a('object');
    });

    it(' is possible to get the new added task', async () => {
      const response = await tasksModel.getTasks();
      expect(response).to.be.a('array');
      response.forEach((task) => {
        expect(task).to.be.a('object');
        expect(task).to.have.all.keys('_id', 'name', 'status', 'date');
      });
    });
  });
});
