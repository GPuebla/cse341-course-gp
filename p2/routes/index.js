const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Books API!');
});

routes.use('/books', require('./books'));

module.exports = routes;