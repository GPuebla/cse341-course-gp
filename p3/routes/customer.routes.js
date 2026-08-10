const routes = require('express').Router();
const customerController = require('../controllers/customer.controller');
const validate = require('../middlewares/validate');
const ensureAuth = require('../middlewares/ensureAuth');
const { customerSchema } = require('../validators/customer.schema');

// All customer routes require an authenticated session — contact data must not
// be exposed on unauthenticated routes.
routes.use(ensureAuth);

// Get all customers
routes.get('/', /*
  #swagger.tags = ['Customers']
  #swagger.summary = 'Get all customers'
  #swagger.description = 'Returns the complete list of customers. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
*/
customerController.getAllCustomers);

// Get a single customer by id
routes.get('/:customerId', /*
  #swagger.tags = ['Customers']
  #swagger.summary = 'Get customer by id'
  #swagger.description = 'Returns a single customer by their MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['customerId'] = {
    in: 'path',
    description: 'Customer MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
*/
customerController.getCustomerById);

// Create a new customer
routes.post('/', validate(customerSchema), /*
  #swagger.tags = ['Customers']
  #swagger.summary = 'Create a customer'
  #swagger.description = 'Creates a new customer. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Customer information',
    schema: {
      name: 'Ana Torres',
      email: 'ana.torres@example.com',
      phone: '+54 11 5555-0100',
      company: 'Torres Import/Export S.A.'
    }
  }
*/
customerController.createCustomer);

// Update a customer
routes.put('/:customerId', validate(customerSchema), /*
  #swagger.tags = ['Customers']
  #swagger.summary = 'Update a customer'
  #swagger.description = 'Updates an existing customer. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['customerId'] = {
    in: 'path',
    description: 'Customer MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated customer information',
    schema: {
      name: 'Ana Torres',
      email: 'ana.torres@example.com',
      phone: '+54 11 5555-0100',
      company: 'Torres Import/Export S.A.'
    }
  }
*/
customerController.updateCustomer);

// Delete a customer
routes.delete('/:customerId', /*
  #swagger.tags = ['Customers']
  #swagger.summary = 'Delete a customer'
  #swagger.description = 'Deletes a customer by their MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['customerId'] = {
    in: 'path',
    description: 'Customer MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
*/
customerController.deleteCustomer);

module.exports = routes;
