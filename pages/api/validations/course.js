const Joi = require("joi");
module.exports = {
  create: {
    body: Joi.object({
      code: Joi.string().required().min(1).max(16).label("Code").messages({
        "string.base": `"Code" should be valid`,
        "string.min": `"Code" must contain minimum of 1 characters`,
        "string.max": `"Code" must contain maximun of 16 characters`,
        "any.required": `"Code" is a required field`,
      }),
      name: Joi.string().required().min(1).max(64).label("Name").messages({
        "string.base": `"Name" should be valid`,
        "string.min": `"Name" must contain minimum of 1 characters`,
        "string.max": `"Name" must contain maximun of 64 characters`,
        "any.required": `"Name" is a required field`,
      }),
      description: Joi.string()
        .allow(null)
        .max(400)
        .label("Description")
        .messages({
          "string.base": `"Description" should be valid`,
          "any.required": `"Description" is a required field`,
        }),
      coordinator: Joi.number().allow(null).label("coordinator"),
      trainer: Joi.string()
        .allow(null)
        .min(1)
        .max(32)
        .label("Trainer")
        .messages({
          "string.base": `"Trainer" should be valid`,
          "string.min": `"Trainer" must contain minimum of 1 characters`,
          "string.max": `"Trainer" must contain maximun of 32 characters`,
          "any.required": `"Trainer" is a required field`,
        }),
        contact_number: Joi.string()
        .regex(/^[0-9]{10,12}$/)
        .messages({
          "number.base": `"Contact_Number" should be a number`,
          "number.min": `"Contact_Number" should be atleast 10 numbers`,
          "number.max": `"Contact_Number" should be allow upto 12 numbers`,
          "number.pattern.base": `"Contact_Number" must be a number`,
        }),
              //     phone(phoneNumber: string, { country, validateMobilePrefix, strictDetection }?: {
              //     country?: string;
              //     validateMobilePrefix?: boolean;
              //     strictDetection?: boolean;
              // }),
      contact_mail: Joi.string()
        .email({ tlds: { allow: ["com"] } })
        .default(null)
        .messages({
          "string.base": `"Contact_email" should be valid`,
          "string.pattern.base": `"email should be in this format example@gmail.com"`,
        }),
        cost_code: Joi.string()
    .allow(null)
        .min(1)
        .max(32)
        .label("Cost Code"),
      // currency: Joi.string().allow(null).label("currency"),
      trainer_from: Joi.string()
      .valid("Internal", "External")
      .required()
      .regex(/^[a-zA-Z\s]{3,30}$/)
      .label("Trainer From"),
  
      trainer_info: Joi.string()
        .allow(null)
        .label("Trainer information")
        .messages({
          "string.base": `"Trainer information" should be a type of string`,
          "any.required": `"Trainer information" is a required field`,
        }),
      // paymenttype: Joi.string()
      //   .valid("Company Sponsored", "Paid by Employee")
      //   .label("Payment type"),
      cost: Joi.number().allow(null).label("Code"),
      status: Joi.string()
        .valid("Active", "Inactive")
        .required()
        .regex(/^[a-zA-Z\s]{3,30}$/)
        .label("Status"),
    }),
    params: Joi.object({}),
    query: Joi.object({}),
  },
  update: {
    body: Joi.object({
      code: Joi.string().required().min(1).max(16).label("Code").messages({
        "string.base": `"Code" should be valid`,
        "string.min": `"Code" must contain minimum of 1 characters`,
        "string.max": `"Code" must contain maximun of 16 characters`,
        "any.required": `"Code" is a required field`,
      }),
      name: Joi.string().required().min(1).max(64).label("Name").messages({
        "string.base": `"Name" should be a valid`,
        "string.min": `"Name" must contain minimum of 1 characters`,
        "string.max": `"Name" must contain maximun of 64 characters`,
        "any.required": `"Name" is a required field`,
      }),
      description: Joi.string()
        .allow(null)
        .max(400)
        .label("Description")
        .messages({
          "string.base": `"Description" should be a type of string`,
          "any.required": `"Description" is a required field`,
        }),
      coordinator: Joi.number().allow(null).label("coordinator"),
      trainer: Joi.string()
        .allow(null)
        .min(1)
        .max(32)
        .label("Trainer")
        .messages({
          "string.base": `"Trainer" should be a valid`,
          "string.min": `"Trainer" must contain minimum of 1 characters`,
          "string.max": `"Trainer" must contain maximun of 32 characters`,
          "any.required": `"Trainer" is a required field`,
        }),
        contact_number: Joi.string()
        .regex(/^[0-9]{10,12}$/)
        .messages({
          "number.base": `"Contact_Number" should be a number`,
          "number.min": `"Contact_Number" should be atleast 10 numbers`,
          "number.max": `"Contact_Number" should be allow upto 12 numbers`,
          "number.pattern.base": `"Contact_Number" must be a number`,
        }),
          //     phone(phoneNumber: string, { country, validateMobilePrefix, strictDetection }?: {
          //     country?: string;
          //     validateMobilePrefix?: boolean;
          //     strictDetection?: boolean;
          // }),
      contact_mail: Joi.string()
        .email({ tlds: { allow: ["com"] } })
        .default(null)
        .messages({
          "string.base": `"Contact_email" should be valid`,
          "string.pattern.base": `"email should be in this format example@gmail.com"`,
        }),

        trainer_from: Joi.string()
        .valid("Internal", "External")
        .required()
        .regex(/^[a-zA-Z\s]{3,30}$/)
        .label("Trainer From"),
    

    cost_code: Joi.string()
    .allow(null)
        .min(5)
        .max(32)
        .label("Cost Code"),
    
      currency: Joi.string().allow(null).label("currency"),
      trainer_info: Joi.string()
        .allow(null)
        .label("Trainer information")
        .messages({
          "string.base": `"Trainer information" should be a type of string`,
          "any.required": `"Trainer information" is a required field`,
        }),
      // paymenttype: Joi.string()
      //   .valid("Company Sponsored", "Paid by Employee")
      //   .label("Payment type"),
      cost: Joi.number().allow(null).label("cost"),
      status: Joi.string()
        .valid("Active", "Inactive")
        .required()
        .regex(/^[a-zA-Z\s]{3,30}$/)
        .label("Status"),
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
