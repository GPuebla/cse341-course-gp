const routes = require('express').Router();

// Welcome / health check
routes.get('/', /*
  #swagger.tags = ['Welcome']
  #swagger.summary = 'Welcome route'
  #swagger.description = 'Welcome route / health check for the API.'
*/
(req, res) => {
  res.send('Welcome to the CargoQuote API!');
});

routes.use('/auth', require('./auth.routes'));
routes.use('/customers', require('./customer.routes'));
routes.use('/quotations', require('./quotation.routes'));
routes.use('/carriers', require('./carrier.routes'));
routes.use('/ports', require('./port.routes'));

module.exports = routes;
