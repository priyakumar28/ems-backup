const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number()
            .required()
            .label('employee'),

            in_time: Joi.date()
            .label('in_time'),

            out_time: Joi.date()
            .label('out_time'),

            note:Joi.string()
            .min(10)
            .max(500)
            .label('note'),

        }),
         params: Joi.object({
             
         }),
         query: Joi.object({
            id: Joi.required()
         }),
       
    },
    
    update: {
        body: Joi.object({
            employee: Joi.number()
            .required()
            .label('employee'),

            in_time: Joi.date()
            .label('in_time'),

            out_time: Joi.date()
            .label('out_time'),

            note:Joi.string()
            .min(10)
            .max(500)
            .label('note'),

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
