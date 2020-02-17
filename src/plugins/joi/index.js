const Joi = require('@hapi/joi');
const customMethods = require('./customValidationMethods/index.js');

const customJoi = Joi.extend(...customMethods);

module.exports = customJoi;
