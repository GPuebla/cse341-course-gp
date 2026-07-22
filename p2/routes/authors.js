const routes = require('express').Router();
const authorsController = require('../controllers/authors');

// Get all authors
routes.get('/', /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Get all authors'
  #swagger.description = 'Returns the complete list of authors.'
*/
authorsController.getAllAuthors);

// Get a single author by id
routes.get('/:id', /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Get author by id'
  #swagger.description = 'Returns a single author by their MongoDB ObjectId.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Author MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
*/
authorsController.getAuthorById);

// Create a new author
routes.post('/', /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Create an author'
  #swagger.description = 'Creates a new author.'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Author information',
    schema: {
      firstName: 'Penelope',
      lastName: 'Rowling',
      nationality: 'Mexican',
      birthDate: '1978-07-06',
      email: 'penelope@example.com',
      biography: 'Author of the many books.',
      active: true
    }
  }
*/
authorsController.createAuthor);

// Update an author
routes.put('/:id', /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Update an author'
  #swagger.description = 'Updates an existing author.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Author MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated author information',
    schema: {
      firstName: 'Penelope',
      lastName: 'Rowling',
      nationality: 'Mexican',
      birthDate: '1978-07-31',
      email: 'penelope@example.com',
      biography: 'Author of the many books.',
      active: true
    }
  }
*/
authorsController.updateAuthor);

// Delete an author
routes.delete('/:id', /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Delete an author'
  #swagger.description = 'Deletes an author by their MongoDB ObjectId.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Author MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
*/
authorsController.deleteAuthor);

module.exports = routes;
