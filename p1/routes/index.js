const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Contacts API!');
});

routes.use('/contacts', require('./contacts'));

module.exports = routes;