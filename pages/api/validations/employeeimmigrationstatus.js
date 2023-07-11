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
    status:Joi.number().required().messages({

      "number.base":`"status" should be a type of number`,
      "any.required":`"status" is must required`
      }),

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
      status:Joi.number().required().messages({
  
        "number.base":`"status" should be a type of number`,
        "any.required":`"status" is must required`
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
