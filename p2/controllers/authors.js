const mongodb = require("../data/db");
const { ObjectId } = require("mongodb");
const { AppError, catchAsync } = require("../utils/errors");

// GET /authors
const getAllAuthors = catchAsync(async (req, res, next) => {
  const authors = await mongodb
    .getDatabase()
    .collection("authors")
    .find()
    .toArray();

  res.status(200).json(authors);
});

// GET /authors/:id
const getAuthorById = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid author id.", 400));
  }
  const authorId = new ObjectId(req.params.id);

  const author = await mongodb
    .getDatabase()
    .collection("authors")
    .findOne({ _id: authorId });

  if (!author) {
    return next(new AppError("Author not found.", 404));
  }

  res.status(200).json(author);
});

// POST /authors
const createAuthor = catchAsync(async (req, res, next) => {
  const author = req.body;

  const result = await mongodb
    .getDatabase()
    .collection("authors")
    .insertOne(author);

  res.status(201).json(result);
});

// PUT /authors/:id
const updateAuthor = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid author id.", 400));
  }
  const authorId = new ObjectId(req.params.id);

  const author = req.body;

  const result = await mongodb
    .getDatabase()
    .collection("authors")
    .updateOne(
      { _id: authorId },
      { $set: author }
    );

  if (result.matchedCount === 0) {
    return next(new AppError("Author not found.", 404));
  }

  res.status(200).json(result);
});

// DELETE /authors/:id
const deleteAuthor = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid author id.", 400));
  }
  const authorId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .collection("authors")
    .deleteOne({ _id: authorId });

  if (result.deletedCount === 0) {
    return next(new AppError("Author not found.", 404));
  }

  res.status(200).json(result);
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
