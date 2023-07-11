const Joi = require("joi");

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      name: Joi.string()
        .required()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z\s]{3,32}$/)
        .messages({
          "string.base": `"Name" should be a type of string`,
          "string.min": `"Name" must contain minmum of 3 characters`,
          "string.max": `"Name" must contain max of 32 characters`,
          "string.pattern.base": `"Name" must contain only alphabets`,
          "any.required": `"dateh" is a required field`,
        }),
      status: Joi.valid("Full Day", "Half Day", "Non-working Day"),
      country: Joi.number().messages({
        "number.base": `"country" should be a type of date`,
        "any.required": `"country" is a required field`,
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
        .regex(/^[a-zA-Z\s]{3,32}$/)
        .messages({
          "string.base": `"Name" should be a type of string`,
          "string.min": `"Name" must contain minmum of 3 characters`,
          "string.max": `"Name" must contain max of 32 characters`,
          "string.pattern.base": `"Name" must contain only alphabets`,
          "any.required": `"dateh" is a required field`,
        }),
      status: Joi.valid('Full Day","Half Day","Non-working Day'),
      country: Joi.number().messages({
        "number.base": `"country" should be a type of date`,
        "any.required": `"country" is a required field`,
      }),
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  remove: {
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  list: {
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },

  getById: {
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
