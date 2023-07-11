const { join } = require("bluebird");
const Joi = require("joi");

module.exports = {
  // POST /v1/routes/create
  create: {
    body: Joi.object({
      name: Joi.string().min(3).max(100).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

        "string.base":`"name" should be a type of string`,
        "string.min":`"name" must contain manimum of 3 characters`,
        "string.max":`"name" must contain maximum of 100 characters`,
        "string.pattern.base":`"name" must contain only alphabets`,
        "any.required":`"name" must be required` 
      
        }),
      details: Joi.string().messages({

        "string.base":`"details" should be a type of string`
      
        }),
      parameters: Joi.string().messages({

        "string.base":`"parameters" should be a type of string`
        }),
      query: Joi.string().messages({

        "string.base":`"query" should be a type of string`
      
        }),
      paramorder: Joi.string().min(5).max(500).required().regex(/^[a-zA-Z\s]{3,500}$/).messages({

        "string.base":`"paramorder" should be a type of string`,
        "string.min":`"paramorder" must contain manimum of 5 characters`,
        "string.max":`"paramorder" must contain maximum of 500 characters`,
        "string.pattern.base":`"paramorder" must contain only alphabets`,
        "any.required":`"paramorder" must be required`
      
        }),
      type: Joi.string().valid("Query", "Class").label("type"),
      report_group: Joi.string().min(5).max(500).regex(/^[a-zA-Z\s]{3,500}$/).messages({

        "string.base":`"report_group" should be a type of string`,
        "string.min":`"report_group" must contain manimum of 5 characters`,
        "string.max":`"report_group" must contain maximum of 500 characters`,
        "string.pattern.base":`"report_group" must contain only alphabets`,
      
        }),
      output: Joi.string().min(5).max(15).required().regex(/^[a-zA-Z\s]{3,15}$/).messages({

        "string.base":`"output" should be a type of string`,
        "string.min":`"output" must contain manimum of 5 characters`,
        "string.max":`"output" must contain maximum of 500 characters`,
        "string.pattern.base":`"output" must contain only alphabets`,
        "any.required":`"output" must be required`
      
        }),
      }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },
  list: {
    body: Joi.object({}),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string().min(3).max(100).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

        "string.base":`"name" should be a type of string`,
        "string.min":`"name" must contain manimum of 3 characters`,
        "string.max":`"name" must contain maximum of 100 characters`,
        "string.pattern.base":`"name" must contain only alphabets`,
        "any.required":`"name" must be required` 
      
        }),
      details: Joi.string().messages({

        "string.base":`"details" should be a type of string`
      
        }),
      parameters: Joi.string().messages({

        "string.base":`"parameters" should be a type of string`
        }),
      query: Joi.string().messages({

        "string.base":`"query" should be a type of string`
      
        }),
      paramorder: Joi.string().min(5).max(500).required().regex(/^[a-zA-Z\s]{3,500}$/).messages({

        "string.base":`"paramorder" should be a type of string`,
        "string.min":`"paramorder" must contain manimum of 5 characters`,
        "string.max":`"paramorder" must contain maximum of 500 characters`,
        "string.pattern.base":`"paramorder" must contain only alphabets`,
        "any.required":`"paramorder" must be required`
      
        }),
      type: Joi.string().valid("Query", "Class").label("type"),
      report_group: Joi.string().min(5).max(500).regex(/^[a-zA-Z\s]{3,500}$/).messages({

        "string.base":`"report_group" should be a type of string`,
        "string.min":`"report_group" must contain manimum of 5 characters`,
        "string.max":`"report_group" must contain maximum of 500 characters`,
        "string.pattern.base":`"report_group" must contain only alphabets`,
      
        }),
      output: Joi.string().min(5).max(15).required().regex(/^[a-zA-Z\s]{3,15}$/).messages({

        "string.base":`"output" should be a type of string`,
        "string.min":`"output" must contain manimum of 5 characters`,
        "string.max":`"output" must contain maximum of 500 characters`,
        "string.pattern.base":`"output" must contain only alphabets`,
        "any.required":`"output" must be required`
      
        }),
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
      id: Joi.number().required()
    }),
  },
  getById: {
    body: Joi.object({}),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
      id: Joi.number().required()
    }),
  },
  remove: {
    body: Joi.object({}),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
      id: Joi.number().required()
    }),
  },
};




