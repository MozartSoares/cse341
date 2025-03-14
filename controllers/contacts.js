import { getDb, initDb } from '../data/database.js';
import { ObjectId } from 'mongodb';

export const getAll = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to get all contacts'
  const db = getDb();
  const contacts = await db.collection('contacts').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(contacts);
};

export const getSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Endpoint to get a single contact'
  // #swagger.parameters['id'] = { description: 'Contact ID' }
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
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Endpoint to create a contact'
  const db = getDb();
  try {
    const contact = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      email: req.body?.email,
      favoriteColor: req.body?.favoriteColor,
      birthday: req.body?.birthday,
    };
    const result = await db.collection('contacts').insertOne(contact);
    res.setHeader('Content-Type', 'application/json');
    res
      .status(201)
      .json({ message: 'Contact created succesfully', id: result.insertedId, ...contact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

export const update = async (req, res) => {
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Endpoint to update a contact'
  //#swagger.parameters['id'] = { description: 'Contact ID' }
  const db = getDb();
  try {
    const contactId = req.params.id;
    const updatedContact = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      email: req.body?.email,
      favoriteColor: req.body?.favoriteColor,
      birthday: req.body?.birthday,
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
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Endpoint to delete a contact'
  //#swagger.parameters['id'] = { description: 'Contact ID' }
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
