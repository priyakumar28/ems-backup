const Joi = require("joi");

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      employee: Joi.number().required().messages({
        "number.base": `"employee" should be a type of number`,
        "any.required": `"employee" is a required field`,
      }),
      date_start: Joi.date().required().messages({
        "date.base": `"date_start" should be a type of date`,
        "any.required": `"date_start" is a required field`,
      }),
      date_end: Joi.date().required().messages({
        "date.base": `"date_end" should be a type of date`,
        "any.required": `"date_end" is a required field`,
      }),
      status: Joi.valid("Approved", "Pending", "Rejected", "Submitted").default(
        "Pending"
      ),
      comments: Joi.string().messages({
        "string.base": `"comments" should be of string type`,
      }),
    }),
  },

  update: {
    body: Joi.object({
      employee: Joi.number().messages({
        "number.base": `"employee" should be a type of number`,
        "any.required": `"employee" is a required field`,
      }),
      date_start: Joi.date().messages({
        "date.base": `"date_start" should be a type of date`,
        "any.required": `"date_start" is a required field`,
      }),
      date_end: Joi.date().messages({
        "date.base": `"date_end" should be a type of date`,
        "any.required": `"date_end" is a required field`,
      }),
      status: Joi.valid("Approved", "Pending", "Rejected", "Submitted").default(
        "Pending"
      ),
      comments: Joi.string().messages({
        "string.base": `"comments" should be of string type`,
      }),
    }),

    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  remove: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  list: {
    query: Joi.object({
      //
    }),
  },
  getById: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
