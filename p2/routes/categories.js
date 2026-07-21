
const routes = require('express').Router();
const categoriesController = require('../controllers/categories');

routes.get('/', /*
  #swagger.tags = ['Categories']
  #swagger.description = 'Get the list of all categories.'
*/ categoriesController.getAllCategories);

routes.get('/:id', /*
  #swagger.tags = ['Categories']
  #swagger.description = 'Get a single category by their id.'
  #swagger.parameters['id'] = { description: 'Category id (MongoDB ObjectId)' }
*/ categoriesController.getCategoryById);

routes.post('/', /*
  #swagger.tags = ['Categories']
  #swagger.description = 'Create a new category.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'New category data',
    schema: {
      name: "Science Fiction"
    }
  }
*/ categoriesController.createCategory);

routes.put('/:id', /*
  #swagger.tags = ['Categories']
  #swagger.description = 'Update an existing category.'
  #swagger.parameters['id'] = { description: 'Category id (MongoDB ObjectId)' }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated category data',
    schema: {
      name: "Science Fiction"
    }
  }
*/ categoriesController.updateCategory);

routes.delete('/:id', /*
  #swagger.tags = ['Categories']
  #swagger.description = 'Delete a category by their id.'
  #swagger.parameters['id'] = { description: 'Category id (MongoDB ObjectId)' }
*/ categoriesController.deleteCategory);

module.exports = routes;