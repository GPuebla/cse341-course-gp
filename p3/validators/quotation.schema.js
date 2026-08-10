const Joi = require('joi');

const QUOTATION_STATUSES = ['draft', 'sent', 'accepted', 'rejected'];

const quotationSchema = Joi.object({
  customerId: Joi.string().hex().length(24).required(),
  carrierId: Joi.string().hex().length(24).optional(),
  origin: Joi.string().min(1).required(),
  destination: Joi.string().min(1).required(),
  cargoType: Joi.string().allow('').optional(),
  weight: Joi.number().positive().optional(),
  volume: Joi.number().positive().optional(),
  rate: Joi.number().positive().optional(),
  currency: Joi.string().allow('').optional(),
  // No .default() here: this schema validates both create AND update
  // (PUT reuses it). A default would inject status:'draft' into req.body
  // whenever a client omits it, silently resetting it on unrelated updates.
  // The 'draft' default is applied once, at document-creation time, by the
  // Mongoose schema (models/Quotation.js) instead.
  status: Joi.string().valid(...QUOTATION_STATUSES).optional(),
  validUntil: Joi.date().iso().optional(),
});

const quotationStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...QUOTATION_STATUSES)
    .required(),
});

module.exports = { quotationSchema, quotationStatusSchema, QUOTATION_STATUSES };
