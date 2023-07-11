const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const URI = process.env.MONGODB_URI || 'mongodb://db:27017';

let db = null;

const connection = () => (db ? Promise.resolve(db)
  : MongoClient.connect(URI, OPTIONS).then((conn) => {
    db = conn.db('todo_list');
    return db;
  }));

module.exports = connection;
