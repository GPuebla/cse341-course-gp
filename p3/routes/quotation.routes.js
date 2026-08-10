const routes = require('express').Router();
const quotationController = require('../controllers/quotation.controller');
const validate = require('../middlewares/validate');
const ensureAuth = require('../middlewares/ensureAuth');
const { quotationSchema, quotationStatusSchema } = require('../validators/quotation.schema');

// All quotation routes require an authenticated session.
routes.use(ensureAuth);

// Get all quotations
routes.get('/', /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Get all quotations'
  #swagger.description = 'Returns the complete list of quotations, with customer and carrier populated. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
*/
quotationController.getAllQuotations);

// Get all quotations for a customer (must be registered before /:quotationId)
routes.get('/customer/:customerId', /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Get quotations by customer'
  #swagger.description = 'Returns all quotations belonging to the specified customer. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['customerId'] = {
    in: 'path',
    description: 'Customer MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a5fcf35bbd9c1e51975510d'
  }
*/
quotationController.getQuotationsByCustomerId);

// Get a single quotation by id
routes.get('/:quotationId', /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Get quotation by id'
  #swagger.description = 'Returns a single quotation by its MongoDB ObjectId, with customer and carrier populated. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['quotationId'] = {
    in: 'path',
    description: 'Quotation MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
*/
quotationController.getQuotationById);

// Create a new quotation
routes.post('/', validate(quotationSchema), /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Create a quotation'
  #swagger.description = 'Creates a new quotation. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Quotation information',
    schema: {
      customerId: '6a5fcf35bbd9c1e51975510d',
      carrierId: '6a610012beb4c4d3b32c9b50',
      origin: 'Puerto de Buenos Aires',
      destination: 'Rotterdam',
      cargoType: 'general',
      weight: 12000,
      volume: 28.5,
      rate: 2450,
      currency: 'USD',
      status: 'draft',
      validUntil: '2026-12-31'
    }
  }
*/
quotationController.createQuotation);

// Update a quotation
routes.put('/:quotationId', validate(quotationSchema), /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Update a quotation'
  #swagger.description = 'Updates an existing quotation. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['quotationId'] = {
    in: 'path',
    description: 'Quotation MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated quotation information',
    schema: {
      customerId: '6a5fcf35bbd9c1e51975510d',
      carrierId: '6a610012beb4c4d3b32c9b50',
      origin: 'Puerto de Buenos Aires',
      destination: 'Rotterdam',
      cargoType: 'general',
      weight: 12000,
      volume: 28.5,
      rate: 2450,
      currency: 'USD',
      status: 'sent',
      validUntil: '2026-12-31'
    }
  }
*/
quotationController.updateQuotation);

// Update only the status of a quotation
routes.put('/:quotationId/status', validate(quotationStatusSchema), /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Update quotation status'
  #swagger.description = 'Updates only the status field of a quotation. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['quotationId'] = {
    in: 'path',
    description: 'Quotation MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'New status. One of: draft, sent, accepted, rejected.',
    schema: { status: 'accepted' }
  }
*/
quotationController.updateQuotationStatus);

// Delete a quotation
routes.delete('/:quotationId', /*
  #swagger.tags = ['Quotations']
  #swagger.summary = 'Delete a quotation'
  #swagger.description = 'Deletes a quotation by its MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['quotationId'] = {
    in: 'path',
    description: 'Quotation MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
*/
quotationController.deleteQuotation);

module.exports = routes;
