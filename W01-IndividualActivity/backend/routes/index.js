const routes = require('express').Router();
const lesson1Controllers = require('../controllers/lesson1');

routes.get('/', lesson1Controllers.welcome);
routes.get('/goodbye', lesson1Controllers.goodbye);
routes.get('/hello', lesson1Controllers.hello);

module.exports = routes;