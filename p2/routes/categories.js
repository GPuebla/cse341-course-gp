const routes = require('express').Router();
const categoriesController = require('../controllers/categories');

// Get all categories
routes.get('/', /*
  #swagger.tags = ['Categories']
  #swagger.summary = 'Get all categories'
  #swagger.description = 'Returns the complete list of categories.'
*/
categoriesController.getAllCategories);

// Get a single category by id
routes.get('/:id', /*
  #swagger.tags = ['Categories']
  #swagger.summary = 'Get category by id'
  #swagger.description = 'Returns a single category by its MongoDB ObjectId.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Category MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
*/
categoriesController.getCategoryById);

// Create a new category
routes.post('/', /*
  #swagger.tags = ['Categories']
  #swagger.summary = 'Create a category'
  #swagger.description = 'Creates a new category.'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Category information',
    schema: {
      name: 'Science Fiction'
    }
  }
*/
categoriesController.createCategory);

// Update a category
routes.put('/:id', /*
  #swagger.tags = ['Categories']
  #swagger.summary = 'Update a category'
  #swagger.description = 'Updates an existing category.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Category MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated category information',
    schema: {
      name: 'Science Fiction'
    }
  }
*/
categoriesController.updateCategory);

// Delete a category
routes.delete('/:id', /*
  #swagger.tags = ['Categories']
  #swagger.summary = 'Delete a category'
  #swagger.description = 'Deletes a category by its MongoDB ObjectId.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Category MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
*/
categoriesController.deleteCategory);

module.exports = routes;
