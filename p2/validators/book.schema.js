const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  isbn: Joi.string().length(13).pattern(/^[0-9]+$/).required(),
  publicationYear: Joi.number()
    .integer()
    .min(1450)
    .max(new Date().getFullYear())
    .required(),
  pages: Joi.number().integer().positive().required(),
  available: Joi.boolean().required(),
  authorId: Joi.string().hex().length(24).required(),
  categoryId: Joi.string().hex().length(24).required(),
});

module.exports = { bookSchema };