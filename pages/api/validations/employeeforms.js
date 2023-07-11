const { join } = require("bluebird");
const Joi = require("joi");

module.exports = {
  // POST /v1/employeeforms/create
  create: {
    body: Joi.object({
    
    employee_id:Joi.number().required().messages({

      "number.base":`"employee_id" should be a type of string`,
      "any.required":`"attachment" must be required` 
    
      }),
    form_id:Joi.number().required().messages({

      "number.base":`"form_id" should be a type of string`,
      "any.required":`"form_id" must be required` 
    
      }),
    status: Joi.valid('Pending','Completed').label("status"),
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
      employee_id:Joi.number().required().messages({

        "number.base":`"employee_id" should be a type of string`,
        "any.required":`"attachment" must be required` 
      
        }),
      form_id:Joi.number().required().messages({
  
        "number.base":`"form_id" should be a type of string`,
        "any.required":`"form_id" must be required` 
      
        }),
      status: Joi.valid('Pending','Completed').label("status"),
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
