const mongodb = require('../data/db');
const objectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res) => {
  const result = await mongodb.getDatabase().collection('books').find();
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getBookById = async (req, res) => {
  const bookId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('books').findOne({ _id: bookId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createBook = async (req, res) => {
  const book = req.body;
  const result = await mongodb.getDatabase().collection('books').insertOne(book);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(result);
}

const updateBook = async (req, res) => {
  const bookId = new objectId(req.params.id);
  const book = req.body;
  const result = await mongodb.getDatabase().collection('books').updateOne
({ _id: bookId }, { $set: book });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

const deleteBook = async (req, res) => {
  const bookId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('books').deleteOne({ _id: bookId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};