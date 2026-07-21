
const routes = require('express').Router();
const authorsController = require('../controllers/authors');

routes.get('/', /*
  #swagger.tags = ['Authors']
  #swagger.description = 'Get the list of all authors.'
*/ authorsController.getAllAuthors);

routes.get('/:id', /*
  #swagger.tags = ['Authors']
  #swagger.description = 'Get a single author by their id.'
  #swagger.parameters['id'] = { description: 'Author id (MongoDB ObjectId)' }
*/ authorsController.getAuthorById);

routes.post('/', /*
  #swagger.tags = ['Authors']
  #swagger.description = 'Create a new author.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'New author data',
    schema: {
      firstName: "Penelope",
      lastName: "Rowling",
      nationality: "Mexican",
      birthDate: "1978-07-06",
      email: "penelope@example.com",
      biography: "Author of the many books.",
      active: true
    }
  }
*/ authorsController.createAuthor);

routes.put('/:id', /*
  #swagger.tags = ['Authors']
  #swagger.description = 'Update an existing author.'
  #swagger.parameters['id'] = { description: 'Author id (MongoDB ObjectId)' }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated author data',
    schema: {
      firstName:"Penelope",
      lastName:"Rowling",
      nationality:"Mexican",
      birthDate:"1978-07-31",
      email:"penelope@example.com",
      biography:"Author of the many books.",
      active:true
    }
  }
*/ authorsController.updateAuthor);

routes.delete('/:id', /*
  #swagger.tags = ['Authors']
  #swagger.description = 'Delete an author by their id.'
  #swagger.parameters['id'] = { description: 'Author id (MongoDB ObjectId)' }
*/ authorsController.deleteAuthor);

module.exports = routes;