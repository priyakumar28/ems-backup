const Joi = require('joi');
module.exports = {
  create: {
    body: Joi.object({
      name: Joi.string().max(32).required().label("name").messages({
        "string.base": `"Name" should be a type of string`,
        "string.max": `"Name" allowed maximum of 30 characters`,
        "any.required": `"Name" is a required field`,
      }),
      client: Joi.number().required().label("client").messages({
        "number.base": `"Client" should be a type of number`,
        "any.required": `"Client" is required field`,
      }),
      details: Joi.string().min(3).max(322).label("details"),
      created: Joi.date().label("created").messages({
        "date.base": `"Dob" should be in valid date format(yyyy:mm:dd)`,
      }),
      start_date: Joi.date().required().label("start_date").messages({
        "date.base": `"started date" should be in valid date format(yyyy:mm:dd)`,
      }),
      end_date: Joi.date().greater(Joi.ref('start_date')).required().label("end_date")
        .messages({
          "date.base": `"end date" should be in valid date format(yyyy:mm:dd)`,
        }),
      status: Joi.string().valid("Active", "On Hold", "Completed", "Dropped"),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  },

  update: {
    body: Joi.object({
      name: Joi.string().max(32).label("name").messages({
        "string.base": `"Name" should be a type of string`,
        "string.max": `"Name" allowed maximum of 30 characters`,
        "any.required": `"Name" is a required field`,
      }),
      client: Joi.number().label("client").messages({
        "number.base": `"Client" should be a type of number`,
        "any.required": `"Client" is required field`,
      }),
      details: Joi.string().label("details"),
      created: Joi.date().label("created").messages({
        "date.base": `"created date" should be in valid date format(yyyy:mm:dd)`,
      }),
      start_date: Joi.date().required().label("start_date").messages({
        "date.base": `"started date" should be in valid date format(yyyy:mm:dd)`,
      }),
      end_date: Joi.date().greater(Joi.ref('start_date')).required().label("end_date")
        .messages({
          "date.base": `"end date" should be in valid date format(yyyy:mm:dd)`,
        }),
      status: Joi.string().valid("Active", "On Hold", "Completed", "Dropped"),
    }),
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },

  delete: {
    // body: Joi.object({}),
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
