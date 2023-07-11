const Joi = require("joi");
module.exports = {
  create: {
    body: Joi.object({
      code: Joi.string().min(1).max(128).required().label("code"),
      name: Joi.string()
        .min(1)
        .max(128)
        .regex(/^[A-Za-z\s]{3,250}$/)
        .required()
        .label("name")
        .messages({
          "string.base": `"name" should be a type of string`,
          "string.max": `"name" must contain maximum of 250 characters`,
          "string.pattern.base": `"name" must contain only alphabets`,
          "any.required": `"name" is a required field`,
        }),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  },
  update: {
    body: Joi.object({
      code: Joi.string().min(1).max(128).label("code"),

      name: Joi.string()
        .min(1)
        .max(128)
        .regex(/^[A-Za-z\s]{3,250}$/)
        .messages({
          "string.base": `"name" should be a type of string`,
          "string.max": `"name" must contain maximum of 250 characters`,
          "string.pattern.base": `"name" must contain only alphabets`,
          "any.required": `"name" is a required field`,
        })
        .label("name"),
    }),
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
  delete: {
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
