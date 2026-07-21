const mongodb = require('../data/db');
const objectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
  const result = await mongodb.getDatabase().collection('authors').find();
  result.toArray().then((authors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  });
};

const getAuthorById = async (req, res) => {
  const authorId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('authors').findOne({ _id: authorId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createAuthor = async (req, res) => {
  const author = req.body;
  const result = await mongodb.getDatabase().collection('authors').insertOne(author);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(result);
}

const updateAuthor = async (req, res) => {
  const authorId = new objectId(req.params.id);
  const author = req.body;
  const result = await mongodb.getDatabase().collection('authors').updateOne
({ _id: authorId }, { $set: author });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

const deleteAuthor = async (req, res) => {
  const authorId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('authors').deleteOne({ _id: authorId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};