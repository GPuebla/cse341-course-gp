const routes = require('express').Router();
const booksController = require('../controllers/books');

// Get all books
routes.get('/', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Get all books'
  #swagger.description = 'Returns the complete list of books.'
*/
booksController.getAllBooks);

// Get all books by author
routes.get('/author/:authorId', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Get books by author'
  #swagger.description = 'Returns all books written by the specified author.'
  #swagger.parameters['authorId'] = {
    in: 'path',
    description: 'Author MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
*/
booksController.getBooksByAuthorId);

// Get all books by category
routes.get('/category/:categoryId', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Get books by category'
  #swagger.description = 'Returns all books that belong to the specified category.'
  #swagger.parameters['categoryId'] = {
    in: 'path',
    description: 'Category MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
*/
booksController.getBooksByCategoryId);

// Get a single book by id
routes.get('/:id', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Get book by id'
  #swagger.description = 'Returns a single book by its MongoDB ObjectId.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Book MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
*/
booksController.getBookById);

// Create a new book
routes.post('/', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Create a book'
  #swagger.description = 'Creates a new book.'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Book information',
    schema: {
      title: 'Harry Potter and the Philosopher\'s Stone',
      isbn: '9780747532699',
      publicationYear: 1997,
      pages: 320,
      available: true,
      authorId: '6a5fcf35bbd9c1e51975510d',
      categoryId: '6a610012beb4c4d3b32c9b50'
    }
  }
*/
booksController.createBook);

// Update a book
routes.put('/:id', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Update a book'
  #swagger.description = 'Updates an existing book.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Book MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated book information',
    schema: {
      title: 'Harry Potter and the Philosopher\'s Stone',
      isbn: '9780747532699',
      publicationYear: 1997,
      pages: 320,
      available: true,
      authorId: '6a5fcf35bbd9c1e51975510d',
      categoryId: '6a610012beb4c4d3b32c9b50'
    }
  }
*/
booksController.updateBook);

// Delete a book
routes.delete('/:id', /*
  #swagger.tags = ['Books']
  #swagger.summary = 'Delete a book'
  #swagger.description = 'Deletes a book by its MongoDB ObjectId.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Book MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
*/
booksController.deleteBook);

module.exports = routes;