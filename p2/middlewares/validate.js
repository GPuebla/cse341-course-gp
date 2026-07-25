const { AppError } = require("../utils/errors");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new AppError(message, 400));
  }

  req.body = value;
  next();
};

module.exports = validate;