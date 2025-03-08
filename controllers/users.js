import { getDb, initDb } from '../data/database.js';
import { ObjectId } from 'mongodb';

export const getAll = async (req, res) => {
  const db = getDb();
  const users = await db.collection('users').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(users);
};

export const getSingle = async (req, res) => {
  const db = getDb();
  const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
  res.setHeader('Content-Type', 'application/json');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
