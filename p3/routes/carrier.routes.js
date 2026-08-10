const routes = require('express').Router();
const carrierController = require('../controllers/carrier.controller');
const validate = require('../middlewares/validate');
const ensureAuth = require('../middlewares/ensureAuth');
const { carrierSchema } = require('../validators/carrier.schema');

// All carrier routes require an authenticated session.
routes.use(ensureAuth);

// Get all carriers
routes.get('/', /*
  #swagger.tags = ['Carriers']
  #swagger.summary = 'Get all carriers'
  #swagger.description = 'Returns the complete list of shipping carriers. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
*/
carrierController.getAllCarriers);

// Get a single carrier by id
routes.get('/:carrierId', /*
  #swagger.tags = ['Carriers']
  #swagger.summary = 'Get carrier by id'
  #swagger.description = 'Returns a single carrier by its MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['carrierId'] = {
    in: 'path',
    description: 'Carrier MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
*/
carrierController.getCarrierById);

// Create a new carrier
routes.post('/', validate(carrierSchema), /*
  #swagger.tags = ['Carriers']
  #swagger.summary = 'Create a carrier'
  #swagger.description = 'Creates a new shipping carrier. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Carrier information',
    schema: {
      name: 'Maersk',
      scacCode: 'MAEU',
      contactEmail: 'contact@maersk.com',
      phone: '+45 33 63 33 63',
      website: 'https://www.maersk.com'
    }
  }
*/
carrierController.createCarrier);

// Update a carrier
routes.put('/:carrierId', validate(carrierSchema), /*
  #swagger.tags = ['Carriers']
  #swagger.summary = 'Update a carrier'
  #swagger.description = 'Updates an existing carrier. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['carrierId'] = {
    in: 'path',
    description: 'Carrier MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated carrier information',
    schema: {
      name: 'Maersk',
      scacCode: 'MAEU',
      contactEmail: 'contact@maersk.com',
      phone: '+45 33 63 33 63',
      website: 'https://www.maersk.com'
    }
  }
*/
carrierController.updateCarrier);

// Delete a carrier
routes.delete('/:carrierId', /*
  #swagger.tags = ['Carriers']
  #swagger.summary = 'Delete a carrier'
  #swagger.description = 'Deletes a carrier by its MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['carrierId'] = {
    in: 'path',
    description: 'Carrier MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a610012beb4c4d3b32c9b50'
  }
*/
carrierController.deleteCarrier);

module.exports = routes;
