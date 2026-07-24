const Joi = require("joi");

const authorSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    nationality: Joi.string().min(1).required(),
    birthDate: Joi.date().iso().max("now").required(),
    email: Joi.string().email().required(),
    biography: Joi.string().min(1).required(),
    active: Joi.boolean().required(),
});

module.exports = { authorSchema };

