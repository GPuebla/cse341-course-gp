const routes = require('express').Router();
const authorsController = require('../controllers/authors');
const validate = require('../middlewares/validate');
const ensureAuth = require('../middlewares/ensureAuth');
const { authorSchema } = require('../validators/author.schema');

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
routes.post('/', ensureAuth, validate(authorSchema), /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Create an author'
  #swagger.description = 'Creates a new author. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
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
routes.put('/:id', ensureAuth, validate(authorSchema), /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Update an author'
  #swagger.description = 'Updates an existing author. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
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
routes.delete('/:id', ensureAuth, /*
  #swagger.tags = ['Authors']
  #swagger.summary = 'Delete an author'
  #swagger.description = 'Deletes an author by their MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
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
