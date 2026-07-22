
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
      title: "Harry Potter and the Philosophers Stone",
      isbn: '9780747532699',
      publicationYear: 1997,
      pages: 320,
      available: false,
      authorId: '2',
      categoryId: '2'
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
      title: "Harry Potter and the Philosophers Stone",
      isbn: '9780747532699',
      publicationYear: 1997,
      pages: 320,
      available: false,
      authorId: '2',
      categoryId: '2'
    }
  }
*/ booksController.updateBook);

routes.delete('/:id', /*
  #swagger.tags = ['Books']
  #swagger.description = 'Delete a book by its id.'
  #swagger.parameters['id'] = { description: 'Book id (MongoDB ObjectId)' }
*/ booksController.deleteBook);

module.exports = routes;
