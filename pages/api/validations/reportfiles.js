const { join } = require("bluebird");
const Joi = require("joi");

module.exports = {
  // POST /v1/routes/create
  create: {
    body: Joi.object({
        employee: Joi.number().messages({

          "number.base":`"employee" should be a type of number`,
        
          }),
        name: Joi.string().min(3).max(100).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

          "string.base":`"name" should be a type of string`,
          "string.min":`"name" must contain manimum of 3 characters`,
          "string.max":`"name" must contain maximum of 100 characters`,
          "string.pattern.base":`"name" must contain only alphabets`,
          "any.required":`"name" must be required`
          
        
          }),
        attachment:Joi.string().min(3).max(100).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

          "string.base":`"attachment" should be a type of string`,
          "string.min":`"attachment" must contain manimum of 3 characters`,
          "string.max":`"attachment" must contain maximum of 100 characters`,
          "string.pattern.base":`"attachment" must contain only alphabets`,
          "any.required":`"attachment" must be required`
          
        
          }),
        created: Joi.date()
        .label("created")
      
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
      employee: Joi.number().messages({

        "number.base":`"employee" should be a type of number`,
      
        }),
      name: Joi.string().min(3).max(100).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

        "string.base":`"name" should be a type of string`,
        "string.min":`"name" must contain manimum of 3 characters`,
        "string.max":`"name" must contain maximum of 100 characters`,
        "string.pattern.base":`"name" must contain only alphabets`,
        "any.required":`"name" must be required`
        
      
        }),
      attachment:Joi.string().min(3).max(100).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

        "string.base":`"attachment" should be a type of string`,
        "string.min":`"attachment" must contain manimum of 3 characters`,
        "string.max":`"attachment" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment" must contain only alphabets`,
        "any.required":`"attachment" must be required`
        
      
        }),
      created: Joi.date()
      .label("created")
    
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
