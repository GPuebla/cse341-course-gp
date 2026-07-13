const mongodb = require('../data/db');
const objectId = require('mongodb').ObjectId;


const getAllContacts = async (req, res) => {
  const result = await mongodb.getDatabase().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getContactById = async (req, res) => {
  const contactId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const contact = req.body;
  const result = await mongodb.getDatabase().collection('contacts').insertOne(contact);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(result);
}

const updateContact = async (req, res) => {
  const contactId = new objectId(req.params.id);
  const contact = req.body;
  const result = await mongodb.getDatabase().collection('contacts').updateOne
({ _id: contactId }, { $set: contact });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

const deleteContact = async (req, res) => {
  const contactId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};