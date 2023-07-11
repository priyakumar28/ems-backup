const Joi = require("joi");

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      project: Joi.number().messages({
        "number.base": `"project" should be a type of number`,
        "any.required": `"project" is a required field`,
      }),
      employee: Joi.number().required().messages({
        "number.base": `"employee" should be a type of number`,
        "any.required": `"employee" is a required field`,
      }),
      timesheet: Joi.number().required().messages({
        "number.base": `"timesheet" should be a type of number`,
        "any.required": `"timesheet" is a required field`,
      }),
      details: Joi.string()
        .max(400)
        //  .regex(/^[a-zA-Z\s]{3,400}$/)//
        .default(null)
        .messages({
          "string.base": `"details" should be a type of string`,
          "string.min": `"details" must contain minmum of 3characters`,
          "string.max": `"details" must contain max of 400 characters`,
          "string.pattern.base": `"details" must contain only alphabets`,
        }),
      created: Joi.date().messages({
        "date.base": `"created" should be a type of date-custom`,
      }),
      date_start: Joi.date().messages({
        "date.base": `"date_start" should be a type of date`,
        "any.required": `"date_start" is a required field`,
      }),
      time_start: Joi.string()
        .required()
        .min(3)
        .max(20)
        .regex(/^([0-1]+[0-9]|[0-9]+:+[0-5]+[0-9])$/)
        //.regex(/^(0?[1-9]|1[012]):[0-5][0-9]$/) AKshay
        //.regex(/^(([0-1]+[0-9])|([0-9])+:+[0-5]+[0-9]+(AM|PM))$/)
        //^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$
        //^(([0-1]+[0-9])|([0-9])+:+[0-5]+[0-9]+(AM|PM))$

        .messages({
          "string.base": `"time_start" should be a type of string`,
          "string.min": `"time_start" must contain minmum of 3characters`,
          "string.max": `"time_start" must contain max of 20 characters`,
        }),
      date_end: Joi.date().required().messages({
        "date.base": `"date_end" should be a type of date`,
        "any.required": `"date_end" is a required field`,
      }),
      time_end: Joi.string()
        .required()
        .min(3)
        .max(10)
        .regex(/^([0-1]+[0-9]|[0-9]+:+[0-5]+[0-9])$/)
        //.regex(/^(0?[1-9]|1[012]):[0-5][0-9]$/) Akshay

        .messages({
          "string.base": `"time_end" should be a type of string`,
          "string.min": `"time_end" must contain minmum of 3characters`,
          "string.max": `"time_end" must contain max of 10 characters`,
        }),
      status: Joi.valid("Active", "Inactive").default("Active"),
    }),

    query: Joi.object({
      //
    }),
  },

  update: {
    body: Joi.object({
      project: Joi.number().messages({
        "number.base": `"project" should be a type of number`,
        "any.required": `"project" is a required field`,
      }),
      employee: Joi.number().required().messages({
        "number.base": `"employee" should be a type of number`,
        "any.required": `"employee" is a required field`,
      }),
      timesheet: Joi.number().required().messages({
        "number.base": `"timesheet" should be a type of number`,
        "any.required": `"timesheet" is a required field`,
      }),
      details: Joi.string().max(400).default(null).messages({
        "string.base": `"details" should be a type of string`,
        "string.max": `"details" can contain max of 400 characters`,
      }),
      created: Joi.date().messages({
        "date.base": `"created" should be a type of date`,
      }),
      date_start: Joi.date().messages({
        "date.base": `"date_start" should be a type of date`,
        "any.required": `"date_start" is a required field`,
      }),
      time_start: Joi.string()
        .required()
        .min(3)
        .max(20)
        .regex(/^([0-1]+[0-9]|[0-9]+:+[0-5]+[0-9])$/)

        //.regex(/^(0?[1-9]|1[012]):[0-5][0-9]$/) Akshay

        .messages({
          "string.base": `"time_start" should be a type of string`,
          "string.min": `"time_start" must contain minmum of 3characters`,
          "string.max": `"time_start" must contain max of 20 characters`,
        }),
      date_end: Joi.date().required().messages({
        "date.base": `"date_end" should be a type of date`,
        "any.required": `"date_end" is a required field`,
      }),
      time_end: Joi.string()
        .required()
        .min(3)
        .max(10)
        .regex(/^([0-1]+[0-9]|[0-9]+:+[0-5]+[0-9])$/)
        //.regex(/^(0?[1-9]|1[012]):[0-5][0-9]$/) Akshay

        .messages({
          "string.base": `"time_start" should be a type of string`,
          "string.min": `"time_start" must contain minmum of 3characters`,
          "string.max": `"time_start" must contain max of 10 characters`,
        }),
      status: Joi.valid("Active", "Inactive").default("Active"),
    }),
    query: Joi.object({
      id: Joi.number()
        .required()
        .messages({ "any.required": "id is required..." }),
    }),
  },
  remove: {
    query: Joi.object({
      id: Joi.number()
        .required()
        .messages({ "any.required": "id is required..." }),
    }),
  },

  getById: {
    query: Joi.object({
      id: Joi.number()
        .required()
        .messages({ "any.required": "id is required..." }),
    }),
  },
};
