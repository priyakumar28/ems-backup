const Joi = require("joi");

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      employer_name: Joi.string()
        .regex(/^[a-zA-Z\s.]*$/)
        .min(3)
        .max(400)
        .label("Company Name")
        .required()
        .messages({
          "string.required": `"Company Name" should be a type of string`,
          "string.base": `"Company Name" should be a type of string`,
          "string.min": `"Company Name" must contain minmum of 3 characters`,
          "string.max": `"Company Name" must contain max of 400 characters`,
          "string.pattern.base": `"Company Name" must contain only alphabets`,
          "any.required": `"Company Name" is a required field`,
        }),
      employee: Joi.number().required().messages({
        "number.base": `"Employee" should be a type of number`,
        "any.required": `"Employee" is a required field`,
      }),
      date_start: Joi.date().required().messages({
        "date.base": `"Start date" should be a type of date`,
        "any.required": `"Start date" is a required field`,
      }),
      date_end: Joi.date().required().min(Joi.ref("date_start")).messages({
        "date.base": `"End date" should be a type of date`,
        "any.required": `"End date" is a required field`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      job_title: Joi.string()
        .regex(/^[a-zA-Z\s]{3,400}$/)
        .allow(null)
        .messages({
          "string.base": `"Job title" should be a type of string`,
          "string.min": `"Job title" must contain minmum of 3characters`,
          "string.max": `"Job title" must contain max of 400 characters`,
          "string.pattern.base": `"Job title" must contain only alphabets`,
        }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      employment_type: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Employment type" should be a type of string`,
        "string.min": `"Employment type" must contain minmum of 3characters`,
        "string.max": `"Employment type" must contain max of 400 characters`,
        // "string.pattern.base": `"Employment type" must contain only alphabets`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      payroll_type: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Payroll type" should be a type of string`,
        "string.min": `"Payroll type" must contain minmum of 3characters`,
        "string.max": `"Payroll type" must contain max of 400 characters`,
        // "string.pattern.base": `"Payroll type" must contain only alphabets`,
      }),
      payroll_amount: Joi.number().allow(null).messages({
        "number.base": `"Payroll amount" should be a type of number`,
        "any.required": `"Payroll amount" is a required field`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      reason_for_leaving: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Reason for leaving" should be a type of string`,
        "string.min": `"Reason for leaving" must contain minmum of 3characters`,
        "string.max": `"Reason for leaving" must contain max of 400 characters`,
        // "string.pattern.base": `"Reason for leaving" must contain only alphabets`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      reference_name: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Reference name" should be a type of string`,
        "string.min": `"Reference name" must contain minmum of 3characters`,
        "string.max": `"Reference name" must contain max of 400 characters`,
        // "string.pattern.base": `"Reference name" must contain only alphabets`,
      }),
      reference_phno: Joi.string().allow(null).min(10).max(12).messages({
        "string.base": `"Reference phone no" should be a type of string`,
        "string.min": `"Reference phone no" must contain minimum of 10 characters`,
        "string.max": `"Reference phone no" must contain maximum of 12 characters`,
      }),
      attachment: Joi.string().label("attachment"),
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
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      employer_name: Joi.string()
        .regex(/^[a-zA-Z\s_.]*$/)
        .min(3)
        .max(400)
        .required()
        .messages({
          "string.required": `"Employer name" should be a type of string`,
          "string.base": `"Employer name" should be a type of string`,
          "string.min": `"Employer name" must contain minmum of 3characters`,
          "string.max": `"Employer name" must contain max of 400 characters`,
          "string.pattern.base": `"Employer name" must contain only alphabets`,
          "any.required": `"Employer name" is a required field`,
        }),
      employee: Joi.number().required().messages({
        "number.base": `"Employee" should be a type of number`,
        "any.required": `"Employee" is a required field`,
      }),
      date_start: Joi.date().required().messages({
        "date.base": `"Start date" should be a type of date`,
        "any.required": `"Start date" is a required field`,
      }),
      date_end: Joi.date().required().min(Joi.ref("date_start")).messages({
        "date.base": `"End date" should be a type of date`,
        "any.required": `"End date" is a required field`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      job_title: Joi.string()
        .regex(/^[a-zA-Z\s]{3,400}$/)
        .allow(null)
        .messages({
          "string.base": `"Job title" should be a type of string`,
          "string.min": `"Job title" must contain minmum of 3characters`,
          "string.max": `"Job title" must contain max of 400 characters`,
          "string.pattern.base": `"Job title" must contain only alphabets`,
        }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      employment_type: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Employment type" should be a type of string`,
        "string.min": `"Employment type" must contain minmum of 3characters`,
        "string.max": `"Employment type" must contain max of 400 characters`,
        // "string.pattern.base": `"Employment type" must contain only alphabets`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      payroll_type: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Payroll type" should be a type of string`,
        "string.min": `"Payroll type" must contain minmum of 3characters`,
        "string.max": `"Payroll type" must contain max of 400 characters`,
        // "string.pattern.base": `"Payroll type" must contain only alphabets`,
      }),
      payroll_amount: Joi.number().allow(null).messages({
        "number.base": `"Payroll amount" should be a type of number`,
        "any.required": `"Payroll amount" is a required field`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      reason_for_leaving: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Reason for leaving" should be a type of string`,
        "string.min": `"Reason for leaving" must contain minmum of 3characters`,
        "string.max": `"Reason for leaving" must contain max of 400 characters`,
        // "string.pattern.base": `"Reason for leaving" must contain only alphabets`,
      }),
      // .regex(/^[a-zA-Z\s]{3,400}$/)
      reference_name: Joi.string().allow(null).min(3).max(400).messages({
        "string.base": `"Reference name" should be a type of string`,
        "string.min": `"Reference name" must contain minmum of 3characters`,
        "string.max": `"Reference name" must contain max of 400 characters`,
        // "string.pattern.base": `"Reference name" must contain only alphabets`,
      }),
      reference_phno: Joi.string()
        .allow(null)
        .min(10)
        .max(12)
        // .regex(/^[0-9\s]{10,12}$/)
        .messages({
          "string.base": `"Reference phone no" should be a type of string`,
          "string.min": `"Reference phone no" must contain minimum of 10 characters`,
          "string.max": `"Reference phone no" must contain maximum of 12 characters`,
        }),
      attachment: Joi.string().label("attachment"),
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  remove: {
    body: Joi.object({
      //
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
      employee: Joi.number().required().messages({
        "number.base": `"Employee" should be a type of number`,
        "any.required": `"Employee" is a required field`,
      }),
    }),
  },
  list: {
    body: Joi.object({
      //
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },
  getById: {
    body: Joi.object({
      //
    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
