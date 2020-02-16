const Joi = require("@hapi/joi");

// personId from mongo that stores in string view
const personId = Joi.string();

const email = Joi.string().email();

const fullName = Joi.string()
  .alphanum()
  .min(1)
  .max(30)
  .required();

module.exports = {
  patterns: {
    personId,
    email,
    fullName
  }
};
