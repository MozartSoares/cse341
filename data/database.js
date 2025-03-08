import { config } from 'dotenv';
config();

import { MongoClient } from 'mongodb';

let database;

export const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};
