const mongodb = require("../data/db");
const { ObjectId } = require("mongodb");
const { AppError, catchAsync } = require("../utils/errors");

// GET /categories
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await mongodb
    .getDatabase()
    .collection("categories")
    .find()
    .toArray();

  res.status(200).json(categories);
});

// GET /categories/:id
const getCategoryById = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid category id.", 400));
  }
  const categoryId = new ObjectId(req.params.id);

  const category = await mongodb
    .getDatabase()
    .collection("categories")
    .findOne({ _id: categoryId });

  if (!category) {
    return next(new AppError("Category not found.", 404));
  }

  res.status(200).json(category);
});

// POST /categories
const createCategory = catchAsync(async (req, res, next) => {
  const category = req.body;

  const result = await mongodb
    .getDatabase()
    .collection("categories")
    .insertOne(category);

  res.status(201).json(result);
});

// PUT /categories/:id
const updateCategory = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid category id.", 400));
  }
  const categoryId = new ObjectId(req.params.id);

  const category = req.body;

  const result = await mongodb
    .getDatabase()
    .collection("categories")
    .updateOne(
      { _id: categoryId },
      { $set: category }
    );

  if (result.matchedCount === 0) {
    return next(new AppError("Category not found.", 404));
  }

  res.status(200).json(result);
});

// DELETE /categories/:id
const deleteCategory = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid category id.", 400));
  }
  const categoryId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .collection("categories")
    .deleteOne({ _id: categoryId });

  if (result.deletedCount === 0) {
    return next(new AppError("Category not found.", 404));
  }

  res.status(200).json(result);
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
