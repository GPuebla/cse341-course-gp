const routes = require('express').Router();

// Welcome / health check
routes.get('/', /*
  #swagger.tags = ['Welcome']
  #swagger.summary = 'Welcome route'
  #swagger.description = 'Welcome route / health check for the API.'
*/
(req, res) => {
  res.send('Welcome to the Books API!');
});

routes.use('/books', require('./books'));
routes.use('/authors', require('./authors'));
routes.use('/categories', require('./categories'));

module.exports = routes;