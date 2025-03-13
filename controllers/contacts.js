import { getDb, initDb } from '../data/database.js';
import { ObjectId } from 'mongodb';

// interface Contact  {
//     email: string,
//     username: string,
//     name: string,
//     ipaddress: Number
// }

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

export const create = async (req, res) => {
  const db = getDb();
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
    };
    const result = await db.collection('contacts').insertOne(contact);
    res.setHeader('Content-Type', 'application/json');
    res
      .status(201)
      .json({ message: 'Contact created succesfully', id: result.insertedId, ...contact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
};

export const update = async (req, res) => {
  const db = getDb();
  try {
    const contactId = req.params.id;
    const updatedContact = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
    };
    const result = await db
      .collection('contacts')
      .updateOne({ _id: new ObjectId(contactId) }, { $set: updatedContact });
    if (result.matchedCount > 0) {
      res
        .status(200)
        .json({ message: 'Contact updated successfully', id: contactId, ...updatedContact });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

export const remove = async (req, res) => {
  const db = getDb();
  const contactId = req.params.id;
  try {
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(contactId) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
};
