const customJoi = require('../../plugins/joi/index.js');

const findByIdSchema = customJoi.object({
    id: customJoi.objectId()
});

const createSchema = customJoi.object({
    email: customJoi.string()
        .email()
        .required(),
    fullName: customJoi.string()
        .min(1)
        .max(30)
        .required()
});

const updateByIdSchema = customJoi.object({
    id: customJoi.objectId(),
    fullName: customJoi.string()
        .min(1)
        .max(30)
        .required()
});


const deleteByIdSchema = customJoi.object({
    id: customJoi.objectId()
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
    deleteByIdSchema
};

module.exports = schemas;
