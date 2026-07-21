const mongodb = require('../data/db');
const objectId = require('mongodb').ObjectId;


const getAllCategories = async (req, res) => {
  const result = await mongodb.getDatabase().collection('categories').find();
  result.toArray().then((categories) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  });
};

const getCategoryById = async (req, res) => {
  const categoryId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('categories').findOne({ _id: categoryId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createCategory = async (req, res) => {
  const category = req.body;
  const result = await mongodb.getDatabase().collection('categories').insertOne(category);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(result);
}

const updateCategory = async (req, res) => {
  const categoryId = new objectId(req.params.id);
  const category = req.body;
  const result = await mongodb.getDatabase().collection('categories').updateOne
({ _id: categoryId }, { $set: category });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

const deleteCategory = async (req, res) => {
  const categoryId = new objectId(req.params.id);
  const result = await mongodb.getDatabase().collection('categories').deleteOne({ _id: categoryId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};