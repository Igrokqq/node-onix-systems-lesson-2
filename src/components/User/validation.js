const Joi = require('@hapi/joi');

// personId from mongo that stores in string view
const personId = Joi.string();

const email = Joi.string().email();

const findByIdSchema = Joi.object().keys({
    id: Joi.string()
        .min(1)
        .max(24)
        .required()
});

const createSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    fullName: Joi.string()
        .min(1)
        .max(30)
        .required()
});

const updateByIdSchema = Joi.object().keys({
    id: Joi.string()
        .min(1)
        .max(24)
        .required(),
    fullName: Joi.string()
        .min(1)
        .max(30)
        .required()
});

const deleteById = Joi.object().keys({
    id: Joi.string()
        .min(1)
        .max(24)
        .required()
});

/**
 * @description Serves validation's schemas
 * @exports
 * @type {{findByIdSchema: *, createSchema: *}}
 */
const schemas = {
    findByIdSchema,
    createSchema,
    updateByIdSchema,
    deleteById
};

module.exports = schemas;
