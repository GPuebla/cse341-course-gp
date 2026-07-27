const { AppError } = require('../utils/errors');

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return next(new AppError('You must be logged in with GitHub to perform this action.', 401));
};

module.exports = ensureAuth;
