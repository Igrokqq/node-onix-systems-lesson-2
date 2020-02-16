const Joi = require("@hapi/joi");

// personId from mongo that stores in string view
const personId = Joi.string();

const email = Joi.string().email();

const fullName = Joi.string()
  .alphanum()
  .min(1)
  .max(30)
  .required();

// console.log(email.validate('lolukr.net', (err, val) => {
//     console.log(err || {}, val);
// }));

module.exports = {
  patterns: {
    personId,
    email,
    fullName
  }
};
