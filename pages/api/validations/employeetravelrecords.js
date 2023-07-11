const { join } = require("bluebird");
const Joi = require("joi");

module.exports = {
  // POST /v1/controllers/employeetravelrecords
  create: {
    body: Joi.object({
    
  
    employee:Joi.number().required().messages({

      "number.base":`"employee" should be a type of number`,
      "any.required":`"employee" is must required`
      
  
      }),
    type:Joi.valid("Local","International"),
    purpose: Joi.string().min(3).max(200).required().regex(/^[a-zA-Z\s]{3,200}$/).messages({

      "string.base":`"purpose" should be a type of string`,
      "string.min":`"purpose" must contain manimum of 3 characters`,
      "string.max":`"purpose" must contain maximum of 200 characters`,
      "string.pattern.base":`"purpose" must contain only alphabets`,
      "any.required":`"purpose" is must required`
  
      }),
    travel_from: Joi.string().min(3).max(200).required().regex(/^[a-zA-Z\s]{3,200}$/).messages({

      "string.base":`"travel_from" should be a type of string`,
      "string.min":`"travel_from" must contain manimum of 3 characters`,
      "string.max":`"travel_from" must contain maximum of 200 characters`,
      "string.pattern.base":`"travel_from" must contain only alphabets`,
      "any.required":`"travel_from" is must required`
  
      }),
    travel_to: Joi.string().min(3).max(200).required().regex(/^[a-zA-Z\s]{3,200}$/).messages({

      "string.base":`"travel_to" should be a type of string`,
      "string.min":`"travel_to" must contain manimum of 3 characters`,
      "string.max":`"travel_to" must contain maximum of 200 characters`,
      "string.pattern.base":`"travel_to" must contain only alphabets`,
      "any.required":`"travel_to" is must required`
  
      }),
    travel_date:Joi.date().label("travel_date"),
    return_date:Joi.date().label("return_date"),
    details: Joi.string().min(3).max(500).regex(/^[a-zA-Z\s]{3,500}$/).messages({

      "string.base":`"travel_to" should be a type of string`,
      "string.min":`"travel_to" must contain manimum of 3 characters`,
      "string.max":`"travel_to" must contain maximum of 500 characters`,
      "string.pattern.base":`"travel_to" must contain only alphabets`,
      
  
      }),
    funding:Joi.number().messages({

      "number.base":`"funding" should be a type of number`,
      }),
    currency:Joi.number().messages({

      "number.base":`"currency" should be a type of number`,
      }),
    attachment1: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment1" should be a type of string`,
      "string.min":`"attachment1" must contain manimum of 3 characters`,
      "string.max":`"attachment1" must contain maximum of 100 characters`,
      "string.pattern.base":`"attachment1" must contain only alphabets`,
  
      }),
    attachment2: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment2" should be a type of string`,
      "string.min":`"attachment2" must contain manimum of 3 characters`,
      "string.max":`"attachment2" must contain maximum of 100 characters`,
      "string.pattern.base":`"attachment2" must contain only alphabets`,
  
      }),
    attachment3: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({

      "string.base":`"attachment3" should be a type of string`,
      "string.min":`"attachment3" must contain manimum of 3 characters`,
      "string.max":`"attachment3" must contain maximum of 100 characters`,
      "string.pattern.base":`"attachment3" must contain only alphabets`,
  
      }),
    created:Joi.date(),
    updated:Joi.date(),
    status:Joi.valid("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing")




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
      type:Joi.valid("Local","International"),
      purpose: Joi.string().min(3).max(200).required().regex(/^[a-zA-Z\s]{3,200}$/).messages({
  
        "string.base":`"purpose" should be a type of string`,
        "string.min":`"purpose" must contain manimum of 3 characters`,
        "string.max":`"purpose" must contain maximum of 200 characters`,
        "string.pattern.base":`"purpose" must contain only alphabets`,
        "any.required":`"purpose" is must required`
    
        }),
      travel_from: Joi.string().min(3).max(200).required().regex(/^[a-zA-Z\s]{3,200}$/).messages({
  
        "string.base":`"travel_from" should be a type of string`,
        "string.min":`"travel_from" must contain manimum of 3 characters`,
        "string.max":`"travel_from" must contain maximum of 200 characters`,
        "string.pattern.base":`"travel_from" must contain only alphabets`,
        "any.required":`"travel_from" is must required`
    
        }),
      travel_to: Joi.string().min(3).max(200).required().regex(/^[a-zA-Z\s]{3,200}$/).messages({
  
        "string.base":`"travel_to" should be a type of string`,
        "string.min":`"travel_to" must contain manimum of 3 characters`,
        "string.max":`"travel_to" must contain maximum of 200 characters`,
        "string.pattern.base":`"travel_to" must contain only alphabets`,
        "any.required":`"travel_to" is must required`
    
        }),
      travel_date:Joi.date().label("travel_date"),
      return_date:Joi.date().label("return_date"),
      details: Joi.string().min(3).max(500).regex(/^[a-zA-Z\s]{3,500}$/).messages({
  
        "string.base":`"travel_to" should be a type of string`,
        "string.min":`"travel_to" must contain manimum of 3 characters`,
        "string.max":`"travel_to" must contain maximum of 500 characters`,
        "string.pattern.base":`"travel_to" must contain only alphabets`,
        
    
        }),
      funding:Joi.number().messages({
  
        "number.base":`"funding" should be a type of number`,
        }),
      currency:Joi.number().messages({
  
        "number.base":`"currency" should be a type of number`,
        }),
      attachment1: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment1" should be a type of string`,
        "string.min":`"attachment1" must contain manimum of 3 characters`,
        "string.max":`"attachment1" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment1" must contain only alphabets`,
    
        }),
      attachment2: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment2" should be a type of string`,
        "string.min":`"attachment2" must contain manimum of 3 characters`,
        "string.max":`"attachment2" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment2" must contain only alphabets`,
    
        }),
      attachment3: Joi.string().min(3).max(100).regex(/^[a-zA-Z\s]{3,100}$/).messages({
  
        "string.base":`"attachment3" should be a type of string`,
        "string.min":`"attachment3" must contain manimum of 3 characters`,
        "string.max":`"attachment3" must contain maximum of 100 characters`,
        "string.pattern.base":`"attachment3" must contain only alphabets`,
    
        }),
      created:Joi.date(),
      updated:Joi.date(),
      status:Joi.valid("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing")
  
  

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



