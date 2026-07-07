const routes = require('express').Router();
const lesson1Controllers = require('../controllers/lesson1');

routes.get('/', lesson1Controllers.sarah);
routes.get('/emily', lesson1Controllers.emily);
routes.get('/hannah', lesson1Controllers.hannah);

module.exports = routes;