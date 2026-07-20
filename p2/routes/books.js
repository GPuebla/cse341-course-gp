
const routes = require('express').Router();
const booksController = require('../controllers/books');

routes.get('/', /*
  #swagger.tags = ['Books']
  #swagger.description = 'Get the list of all books.'
*/ booksController.getAllBooks);

routes.get('/:id', /*
  #swagger.tags = ['Books']
  #swagger.description = 'Get a single book by its id.'
  #swagger.parameters['id'] = { description: 'Book id (MongoDB ObjectId)' }
*/ booksController.getBookById);

routes.post('/', /*
  #swagger.tags = ['Books']
  #swagger.description = 'Create a new book.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'New book data',
    schema: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publicationYear: 1925
    }
  }
*/ booksController.createBook);

routes.put('/:id', /*
  #swagger.tags = ['Books']
  #swagger.description = 'Update an existing book.'
  #swagger.parameters['id'] = { description: 'Book id (MongoDB ObjectId)' }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated book data',
    schema: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publicationYear: 1925
    }
  }
*/ booksController.updateBook);

routes.delete('/:id', /*
  #swagger.tags = ['Books']
  #swagger.description = 'Delete a book by its id.'
  #swagger.parameters['id'] = { description: 'Book id (MongoDB ObjectId)' }
*/ booksController.deleteBook);

module.exports = routes;
