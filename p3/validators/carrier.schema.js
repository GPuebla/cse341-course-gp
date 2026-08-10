const Joi = require('joi');

const carrierSchema = Joi.object({
  name: Joi.string().min(1).required(),
  scacCode: Joi.string().allow('').optional(),
  contactEmail: Joi.string().email().allow('').optional(),
  phone: Joi.string().allow('').optional(),
  website: Joi.string().uri().allow('').optional(),
});

module.exports = { carrierSchema };
