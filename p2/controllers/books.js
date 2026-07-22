const mongodb = require("../data/db");
const { ObjectId } = require("mongodb");

// GET /books
const getAllBooks = async (req, res) => {
  try {
    const books = await mongodb
      .getDatabase()
      .collection("books")
      .find()
      .toArray();

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/:id
const getBookById = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const book = await mongodb
      .getDatabase()
      .collection("books")
      .findOne({ _id: bookId });

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/author/:authorId
const getBooksByAuthorId = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.authorId);

    const books = await mongodb
      .getDatabase()
      .collection("books")
      .find({ authorId })
      .toArray();

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/category/:categoryId
const getBooksByCategoryId = async (req, res) => {
  try {
    const categoryId = new ObjectId(req.params.categoryId);

    const books = await mongodb
      .getDatabase()
      .collection("books")
      .find({ categoryId })
      .toArray();

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /books
const createBook = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /books/:id
const updateBook = async (req, res) => {
  try {
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
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /books/:id
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .collection("books")
      .deleteOne({ _id: bookId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByAuthorId,
  getBooksByCategoryId,
  createBook,
  updateBook,
  deleteBook
};