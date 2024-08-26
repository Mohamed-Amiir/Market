const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  seller: Joi.string().required(),
});

module.exports = schema;
