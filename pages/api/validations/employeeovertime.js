const Joi = require("joi");

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      employee_id: Joi.number().required().messages({
        "number.base": `"employee_id" should be a type of number`,
        "any.required": `"employee_id" is a required field`,
      }),
      start_time: Joi.date().messages({
        "date.base": `"start_time" should be a type of date`,
      }),
      end_time: Joi.date().messages({
        "date.base": `"end_time" should be a type of date`,
      }),
      category_id: Joi.number().required().messages({
        "number.base": `"category_id" should be a type of number`,
        "any.required": `"category_id" is a required field`,
      }),
      project: Joi.number().messages({
        "number.base": `"project" should be a type of number`,
      }),
      notes: Joi.string()
        .required()
        .min(3)
        .max(400)
        .regex(/^[a-zA-Z\s]{3,400}$/)
        .default(null)
        .messages({
          "string.base": `"notes" should be a type of string`,
          "string.min": `"notes" must contain minmum of 3characters`,
          "string.max": `"notes" must contain max of 400 characters`,
          "string.pattern.base": `"notes" must contain only alphabets`,
        }),
      created: Joi.date().messages({
        "date.base": `"created" should be a type of date`,
      }),
      updated: Joi.date().messages({
        "date.base": `"updated" should be a type of date`,
      }),
      status: Joi.valid(
        "Approved",
        "Pending",
        "Rejected",
        "Cancellation Requested",
        "Cancelled",
        "Processing"
      ).default("Pending"),
    }),
    query: Joi.object({
      //
    }),
  },

  update: {
    body: Joi.object({
      employee_id: Joi.number().required().messages({
        "number.base": `"employee_id" should be a type of number`,
        "any.required": `"employee_id" is a required field`,
      }),
      start_time: Joi.date().messages({
        "date.base": `"start_time" should be a type of date`,
      }),
      end_time: Joi.date().messages({
        "date.base": `"end_time" should be a type of date`,
      }),
      category_id: Joi.number().required().messages({
        "number.base": `"category_id" should be a type of number`,
        "any.required": `"category_id" is a required field`,
      }),
      project: Joi.number().messages({
        "number.base": `"project" should be a type of number`,
      }),
      notes: Joi.string()
        .required()
        .min(3)
        .max(400)
        .regex(/^[a-zA-Z\s]{3,400}$/)
        .default(null)
        .messages({
          "string.base": `"notes" should be a type of string`,
          "string.min": `"notes" must contain minmum of 3characters`,
          "string.max": `"notes" must contain max of 400 characters`,
          "string.pattern.base": `"notes" must contain only alphabets`,
        }),
      created: Joi.date().messages({
        "date.base": `"created" should be a type of date`,
      }),
      updated: Joi.date().messages({
        "date.base": `"updated" should be a type of date`,
      }),
      status: Joi.valid(
        "Approved",
        "Pending",
        "Rejected",
        "Cancellation Requested",
        "Cancelled",
        "Processing"
      ).default("Pending"),
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
