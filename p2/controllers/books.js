const mongodb = require("../data/db");
const { ObjectId } = require("mongodb");
const { AppError, catchAsync } = require("../utils/errors");

// GET /books
const getAllBooks = catchAsync(async (req, res, next) => {
  const books = await mongodb
    .getDatabase()
    .collection("books")
    .find()
    .toArray();

  res.status(200).json(books);
});

// GET /books/:id
const getBookById = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book id.", 400));
  }
  const bookId = new ObjectId(req.params.id);

  const book = await mongodb
    .getDatabase()
    .collection("books")
    .findOne({ _id: bookId });

  if (!book) {
    return next(new AppError("Book not found.", 404));
  }

  res.status(200).json(book);
});

// GET /books/author/:authorId
const getBooksByAuthorId = catchAsync(async (req, res, next) => {
  const authorId = new ObjectId(req.params.authorId);

  const books = await mongodb
    .getDatabase()
    .collection("books")
    .find({ authorId })
    .toArray();

  res.status(200).json(books);
});

// GET /books/category/:categoryId
const getBooksByCategoryId = catchAsync(async (req, res, next) => {
  const categoryId = new ObjectId(req.params.categoryId);

  const books = await mongodb
    .getDatabase()
    .collection("books")
    .find({ categoryId })
    .toArray();

  res.status(200).json(books);
});

// POST /books
const createBook = catchAsync(async (req, res, next) => {
  const book = {
    ...req.body,
    authorId: new ObjectId(req.body.authorId),
    categoryId: new ObjectId(req.body.categoryId)
  };

  const result = await mongodb
    .getDatabase()
    .collection("books")
    .insertOne(book);

  res.status(201).json(result);
});

// PUT /books/:id
const updateBook = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book id.", 400));
  }
  const bookId = new ObjectId(req.params.id);

  const book = {
    ...req.body,
    authorId: new ObjectId(req.body.authorId),
    categoryId: new ObjectId(req.body.categoryId)
  };

  const result = await mongodb
    .getDatabase()
    .collection("books")
    .updateOne(
      { _id: bookId },
      { $set: book }
    );

  if (result.matchedCount === 0) {
    return next(new AppError("Book not found.", 404));
  }

  res.status(200).json(result);
});

// DELETE /books/:id
const deleteBook = catchAsync(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book id.", 400));
  }
  const bookId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .collection("books")
    .deleteOne({ _id: bookId });

  if (result.deletedCount === 0) {
    return next(new AppError("Book not found.", 404));
  }

  res.status(200).json(result);
});

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByAuthorId,
  getBooksByCategoryId,
  createBook,
  updateBook,
  deleteBook
};