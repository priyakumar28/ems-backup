const { join } = require("bluebird");
const Joi = require("joi");

module.exports = {
  // POST /v1/employeeeducations/create
  create: {
    body: Joi.object({
    
    employee:Joi.number().required().messages({

      "number.base":`"employee" should be a type of number`,
      "any.required":`"employee" is must required`
      
  
      }),
    document:Joi.number().messages({

      "number.base":`"document" should be a type of number`,
      "any.required":`"document" is must required`
      
  
      }),
    documentname:Joi.string().min(3).max(150).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment1" should be a type of string`,
      "string.min":`"attachment1" must contain manimum of 3 characters`,
      "string.max":`"attachment1" must contain maximum of 150 characters`,
      "string.pattern.base":`"documentname" must contain only alphabets`,
      "any.required":`"documentname" must required`
  
      }),
    valid_until:Joi.date().required(),
    status:Joi.valid("Active","Inactive","Draft"),
    details:Joi.string().messages({

      "string.base":`"attachment1" should be a type of string`,
      }),
    attachment1:Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment1" should be a type of string`,
      "string.min":`"attachment1" must contain manimum of 3 characters`,
      "string.max":`"attachment1" must contain maximum of 100 characters`,
      "string.pattern.base":`"attachment1" must contain only alphabets`,
  
      }),
      attachment2:Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment2" should be a type of string`,
      "string.min":`"attachment2" must contain manimum of 3 characters`,
      "string.max":`"attachment2" must contain maximum of 100 characters`,
      "string.pattern.base":`"attachment2" must contain only alphabets`,
  
      }),
    attachment3:Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment3" should be a type of string`,
      "string.min":`"attachment3" must contain manimum of 3 characters`,
      "string.max":`"attachment3" must contain maximum of 100 characters`,
      "string.pattern.base":`"attachment3" must contain only alphabets`,
  
      }),
    created:Joi.date(),
    updated:Joi.date()





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
      employee:Joi.number().required().messages({

        "number.base":`"employee" should be a type of number`,
        "any.required":`"employee" is must required`
        
    
        }),
      document:Joi.number().messages({
  
        "number.base":`"document" should be a type of number`,
        "any.required":`"document" is must required`
        
    
        }),
      documentname:Joi.string().min(3).max(150).required().regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment1" should be a type of string`,
        "string.min":`"attachment1" must contain manimum of 3 characters`,
        "string.max":`"attachment1" must contain maximum of 150 characters`,
        "string.pattern.base":`"documentname" must contain only alphabets`,
        "any.required":`"documentname" must required`
    
        }),
      valid_until:Joi.date().required(),
      status:Joi.valid("Active","Inactive","Draft"),
      details:Joi.string().messages({
  
        "string.base":`"attachment1" should be a type of string`,
        }),
      attachment1:Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment1" should be a type of string`,
        "string.min":`"attachment1" must contain manimum of 3 characters`,
        "string.max":`"attachment1" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment1" must contain only alphabets`,
    
        }),
        attachment2:Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment2" should be a type of string`,
        "string.min":`"attachment2" must contain manimum of 3 characters`,
        "string.max":`"attachment2" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment2" must contain only alphabets`,
    
        }),
      attachment3:Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment3" should be a type of string`,
        "string.min":`"attachment3" must contain manimum of 3 characters`,
        "string.max":`"attachment3" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment3" must contain only alphabets`,
    
        }),
      created:Joi.date(),
      updated:Joi.date()
  
    

    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
      id: Joi.number().required()
    }),
  },
  list: {
      body: Joi.object({
       

    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },
  remove: {
    body: Joi.object({
      


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
    body: Joi.object({
      

    }),
    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
      id: Joi.number().required()
    }),
  },

};
