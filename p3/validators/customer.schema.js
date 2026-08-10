const Joi = require('joi');

const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('').optional(),
  company: Joi.string().allow('').optional(),
});

module.exports = { customerSchema };
