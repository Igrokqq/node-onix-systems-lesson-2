const Joi = require('@hapi/joi');
const objectId = require('./objectId');

const customMethods = [objectId];

const customJoi = Joi.extend(...customMethods);

module.exports = customJoi;
