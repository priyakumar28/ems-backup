const Joi = require("joi");

module.exports = {
  create: {
    body: Joi.object({
      account_type: Joi.valid('Personal','Salaried').required(),
      bank_name: Joi.string()
        .max(64)
        .required()
        .messages({
          "string.base": `"Bank name" should be a type of string`,
          "string.max": `"Bank name" must contain maximum of 32 characters`,
          "any.required": `"Bank name" is a required field`,
          "string.pattern.base": `"Bank name" must contain alphabets`,
        }),
      branch: Joi.string()
        .required()
        .max(32)
        .messages({
          "string.base": `"Branch" should be a type of string`,
          "string.max": `"Branch" must contain maximum of 32 characters`,
          "any.required": `"Branch" is a required field`,
          "string.pattern.base": `"Branch Name" must contain alphabets`,
        }),
      account_number: Joi.string()
        .required()
        .min(9)
        .max(18)
        .messages({
          "string.base": `Account number" should be a type of string`,
          "string.max": `"Account number" must contain maximum of 18 characters`,
          "any.required": `"Account number" is a required field`,
          "string.pattern.base": `"Account number" must contain numbers`,
        }),
      ifsc: Joi.string()
        .required()
        .max(16)
        .messages({
          "string.base": `ifsc " should be a type of string`,
          "string.max": `"ifsc" must contain maximum of 16 characters`,
          "any.required": `"ifsc" is a required field`,
          "string.pattern.base": `"IFSC" must contain alphanumeric`,
        }),
      emp_id: Joi.number()
        .required()
        .messages({
          "string.base": `Employee id" should be a type of number`,
          "any.required": `"Employee id" is a required`,
        }),
      createdBy : Joi.string(),
      attachment: Joi.any()
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  },
  update: {
    body: Joi.object({
      account_type: Joi.valid('Personal', 'Salaried'),
      bank_name: Joi.string()
        .max(64)     
        .messages({
          "string.max": `"Bank name" must contain maximum of 32 characters`,
          "string.pattern.base": `"Bank name" must contain alphabets`,  
        }),
      branch: Joi.string()
        .max(32)
        .messages({
          "string.max": `"Branch name" must contain maximum of 32 characters`,
          "string.pattern.base": `"Branch name" must contain alphabets`,
        }),
      account_number: Joi.string()
        .min(9)
        .max(18)
        .messages({
          "string.max": `"Account number" must contain maximum of 18 characters`,
          "string.pattern.base": `"Account number" must contain numbers`,
        }),
      ifsc: Joi.string()
        .max(16)
        .messages({
          "string.max": `"IFSC" must contain maximum of 32 characters`,
          "string.pattern.base": `"IFSC" must contain alphanumeric`,
        }),
      emp_id: Joi.number()
        .messages({
          "string.base": `Employee id" should be a type of number`,         
        }),
      createdBy : Joi.string(),
      attachment: Joi.any()
    }),
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  delete: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  getById: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
