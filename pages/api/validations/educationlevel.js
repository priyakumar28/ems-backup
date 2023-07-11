const Joi = require('joi');

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      name: Joi.string()
        .required()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z\s]{3,100}$/)
        .messages({
          "string.base": `"Name" should be a type of string`,
          "string.min": `"Name" must contain minmum of 3characters`,
          "string.max": `"Name" must contain max of 32 characters`,
          "string.pattern.base": `"Name" must contain only alphabets`,
          "any.required": `"Name" is a required field`,
        }),
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string()
        .required()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z\s]{3,100}$/)
        .messages({
          "string.base": `"Name" should be a type of string`,
          "string.min": `"Name" must contain minmum of 3characters`,
          "string.max": `"Name" must contain max of 32 characters`,
          "string.pattern.base": `"Name" must contain only alphabets`,
          "any.required": `"Name" is a required field`,
        }),
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  delete: {
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  

  getById: {
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
