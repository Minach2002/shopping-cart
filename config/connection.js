const { MongoClient } = require('mongodb');

const state = {
  db: null
};

module.exports.connect = function(done) {
const url = 'mongodb://127.0.0.1:27017';

  const dbname = 'shopping';

  const options = {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  };

  MongoClient.connect(url, options)
    .then(client => {
      state.db = client.db(dbname);
      done(); // Successfully connected
    })
    .catch(err => {
      done(err); // If error occurs
    });
};

module.exports.get = function() {
  return state.db;
};
