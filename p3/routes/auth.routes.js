const routes = require('express').Router();
const passport = require('../config/passport');
const ensureAuth = require('../middlewares/ensureAuth');
const authController = require('../controllers/auth.controller');

// Start the GitHub OAuth flow
routes.get('/github', /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Log in with GitHub'
  #swagger.description = 'Redirects to GitHub to authorize this app. Open this URL directly in a browser tab (not via Swagger "Try it out", which cannot follow the GitHub login redirect).'
*/
passport.authenticate('github', { scope: ['user:email'] }));

// GitHub redirects back here after the user approves (or denies) access
routes.get('/github/callback', /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'GitHub OAuth callback'
  #swagger.description = 'Called automatically by GitHub after authorization. Creates or updates the local user and starts the session. Not meant to be invoked directly.'
*/
passport.authenticate('github', { failureRedirect: '/auth/failure' }),
authController.githubCallback);

// Shown when GitHub authorization fails or is denied
routes.get('/failure', /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Authentication failure'
  #swagger.description = 'Returned when GitHub authorization did not succeed.'
*/
authController.failure);

// Destroys the session
routes.get('/logout', /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Log out'
  #swagger.description = 'Ends the current session and clears the session cookie.'
*/
authController.logout);

// Protected: only visible to a logged-in user
routes.get('/user', ensureAuth, /*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Get current logged-in user'
  #swagger.description = 'Returns the profile of the currently authenticated user, or 401 if there is no active session. Log in via GET /auth/github in a browser first, then call this from the same browser session.'
  #swagger.security = [{ "sessionAuth": [] }]
*/
authController.getCurrentUser);

module.exports = routes;
