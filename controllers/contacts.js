import { getDb, initDb } from '../data/database.js';
import { ObjectId } from 'mongodb';

export const getAll = async (req, res) => {
  const db = getDb();
  const contacts = await db.collection('contacts').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(contacts);
};

export const getSingle = async (req, res) => {
  const db = getDb();
  const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
  res.setHeader('Content-Type', 'application/json');
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'contact not found' });
  }
};
