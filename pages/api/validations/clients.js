const Joi = require("joi");
const {phone} = require("phone");
const { max } = require("moment");
module.exports = {
  create: {
    body: Joi.object({
      name: Joi.string()
        .max(30)
        .regex(/^[a-zA-Z\s]{0,30}$/)
        .required()
        .messages({
          "string.base": `"Name" should be a type of string`,
          "string.max": `"Name" allowed maximum of 30 characters`,
          "string.pattern.base": `"Name" must contain only alphabets`,
          "any.required": `"Name" is a required field`,
        }),
      details: Joi.string().messages({
        "string.base": `"Details" Should be a string`,
      }),
      first_contact_date: Joi.date().messages({
        "date.base": `"First_contact" should be in valid date format(yyyy:mm:dd)`,
      }),
      created: Joi.date().messages({
        "date.base": `"created" should be in valid date format(yyyy:mm:dd)`,
      }),
      address: Joi.string().messages({
        "string.base": `"Address" Should be a string`,
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
      contact_email: Joi.string()
        .email({ tlds: { allow: ["com"] } })
        .default(null)
        .messages({
          "string.base": `"Contact_email" should be a string`,
          "string.pattern.base": `"email should be in this format example@gmail.com"`,
        }),
      company_url: Joi.string().regex(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      ),
      status: Joi.string().valid("Active", "Inactive"),
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string()
        .max(30)
        .regex(/^[a-zA-Z\s]{0,30}$/)
        .messages({
          "string.base": `"Name" should be a type of string`,
          "string.max": `"Name" allowed maximum of 30 characters`,
          "string.pattern.base": `"Name" must contain only alphabets`,
          "any.required": `"Name" is a required field`,
        }),
      details: Joi.string().messages({
        "string.base": `"Details" Should be a string`,
      }),
      first_contact_date: Joi.date().messages({
        "date.base": `"First_contact" should be in valid date format(yyyy:mm:dd)`,
      }),
      created: Joi.date().messages({
        "date.base": `"created" should be in valid date format(yyyy:mm:dd)`,
      }),
      address: Joi.string().messages({
        "string.base": `"Address" Should be a string`,
      }),
      contact_number: Joi.string()
        .min(10)
        .max(12)
        .regex(/^[0-9]{12}$/)
        .messages({
          "number.base": `"Contact_Number" should be a number`,
          "number.min": `"Contact_Number" should be atleast 10 numbers`,
          "number.max": `"Contact_Number" should be allow upto 12 numbers`,
          "number.pattern.base": `"Contact_Number" must be a number`,
        }),
      contact_email: Joi.string().messages({
        "string.base": `"Contact_email" should be a string`,
        "string.pattern.base": `"email should be in this format example@gmail.com"`,
      }),
      company_url: Joi.string().default(null),
      status: Joi.string().valid("Active", "Inactive"),
    }),
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  delete: {
    body: Joi.object({}),
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
