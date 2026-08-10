const Joi = require('joi');

const portSchema = Joi.object({
  name: Joi.string().min(1).required(),
  unlocode: Joi.string().allow('').optional(),
  country: Joi.string().min(1).required(),
});

module.exports = { portSchema };
