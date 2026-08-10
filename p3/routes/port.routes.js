const routes = require('express').Router();
const portController = require('../controllers/port.controller');
const validate = require('../middlewares/validate');
const ensureAuth = require('../middlewares/ensureAuth');
const { portSchema } = require('../validators/port.schema');

// All port routes require an authenticated session.
routes.use(ensureAuth);

// Get all ports
routes.get('/', /*
  #swagger.tags = ['Ports']
  #swagger.summary = 'Get all ports'
  #swagger.description = 'Returns the complete list of ports. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
*/
portController.getAllPorts);

// Get a single port by id
routes.get('/:portId', /*
  #swagger.tags = ['Ports']
  #swagger.summary = 'Get port by id'
  #swagger.description = 'Returns a single port by its MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['portId'] = {
    in: 'path',
    description: 'Port MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
*/
portController.getPortById);

// Create a new port
routes.post('/', validate(portSchema), /*
  #swagger.tags = ['Ports']
  #swagger.summary = 'Create a port'
  #swagger.description = 'Creates a new port. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Port information',
    schema: {
      name: 'Puerto de Buenos Aires',
      unlocode: 'ARBUE',
      country: 'Argentina'
    }
  }
*/
portController.createPort);

// Update a port
routes.put('/:portId', validate(portSchema), /*
  #swagger.tags = ['Ports']
  #swagger.summary = 'Update a port'
  #swagger.description = 'Updates an existing port. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['portId'] = {
    in: 'path',
    description: 'Port MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Updated port information',
    schema: {
      name: 'Puerto de Buenos Aires',
      unlocode: 'ARBUE',
      country: 'Argentina'
    }
  }
*/
portController.updatePort);

// Delete a port
routes.delete('/:portId', /*
  #swagger.tags = ['Ports']
  #swagger.summary = 'Delete a port'
  #swagger.description = 'Deletes a port by its MongoDB ObjectId. Requires an active GitHub-authenticated session.'
  #swagger.security = [{ "sessionAuth": [] }]
  #swagger.parameters['portId'] = {
    in: 'path',
    description: 'Port MongoDB ObjectId',
    required: true,
    type: 'string',
    example: '6a700001aed1842b4a131001'
  }
*/
portController.deletePort);

module.exports = routes;
