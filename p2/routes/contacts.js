
const routes = require('express').Router();
const contactsController = require('../controllers/contacts');

routes.get('/', /*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Get the list of all contacts.'
*/ contactsController.getAllContacts);

routes.get('/:id', /*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Get a single contact by its id.'
  #swagger.parameters['id'] = { description: 'Contact id (MongoDB ObjectId)' }
*/ contactsController.getContactById);

routes.post('/', /*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Create a new contact.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'New contact data',
    schema: {
      firstName: 'Maria Eugenia',
      lastName: 'Thomas',
      email: 'test6@test.com',
      favoriteColor: 'orange',
      birthday: '1987-06-16'
    }
  }
*/ contactsController.createContact);

routes.put('/:id', /*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Update an existing contact.'
  #swagger.parameters['id'] = { description: 'Contact id (MongoDB ObjectId)' }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated contact data',
    schema: {
      firstName: 'Maria Lourdes',
      lastName: 'Thomas',
      email: 'test5@test.com',
      favoriteColor: 'orange',
      birthday: '1987-06-16'
    }
  }
*/ contactsController.updateContact);

routes.delete('/:id', /*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Delete a contact by its id.'
  #swagger.parameters['id'] = { description: 'Contact id (MongoDB ObjectId)' }
*/ contactsController.deleteContact);

module.exports = routes;