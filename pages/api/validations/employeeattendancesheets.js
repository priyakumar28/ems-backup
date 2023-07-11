const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            employee_id: Joi.number()
            .required()
            .label('employee_id'),

            date_start: Joi.date()
            .required()
            .label('date_start'),

            date_end: Joi.date()
            .required()
            .label('date_end'),

            status:Joi.valid('Approved','Pending','Rejected','Submitted')
            .label('status'),

        }),
         params: Joi.object({
             
         }),
         query: Joi.object({
            id: Joi.required()
         }),
       
    },
    
    update: {
        body: Joi.object({
            employee_id: Joi.number()
            .label('employee_id'),

            date_start: Joi.date()
            .label('date_start'),

            date_end: Joi.date()
            .label('date_end'),

            status:Joi.valid('Approved','Pending','Rejected','Submitted')
            .label('status'),

        }),
         params: Joi.object({
             
         }),
         query: Joi.object({
            id: Joi.required()
         }),
       
    },
    getById:{
        params: Joi.object({
            
        }),
        query: Joi.object({
            id: Joi.required()
         }),
    },
    delete:{
        params: Joi.object({
            
        }),
        query: Joi.object({
            id: Joi.required()
         }),
    }
};
