const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const tasksService = require('../../services/tasksService');
const tasksModel = require('../../models/tasksModel');

describe('tests addTasks validations', () => {
  before(() => {
    const successfulResult = { acknowledged: true, insertedId: new ObjectId('61e329f3aa7b616be45d5da0') };
    sinon.stub(tasksModel, 'addTask').resolves(successfulResult);
  });

  after(() => {
    tasksModel.addTask.restore();
  });

  it('returns an error while attempting to add a new task without task', async () => {
    const task = { status: 'pending' };
    const response = await tasksService.addTask(task);
    expect(response.error).to.be.a('object');
    expect(response.error).to.have.all.keys('errorType', 'message');
    expect(response.error.errorType).to.equal('invalid request');
    expect(response.error.message).to.equal('task or status missing or invalid');
  });

  it('returns an error while attempting to add a new task without status', async () => {
    const task = { task: 'Plant potatoes' };
    const response = await tasksService.addTask(task);
    expect(response.error).to.be.a('object');
    expect(response.error).to.have.all.keys('errorType', 'message');
    expect(response.error.errorType).to.equal('invalid request');
    expect(response.error.message).to.equal('task or status missing or invalid');
  });

  it('successfully creates a new task in the database', async () => {
    const task = { task: 'Plant potatoes', status: 'pending' };
    const response = await tasksModel.addTask(task);
    expect(response).to.be.a('object');
    expect(response).to.have.all.keys('acknowledged', 'insertedId');
    expect(response).to.include({ acknowledged: true });
    expect(response.insertedId).to.be.a('object');
  });
});
