const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({

            job: Joi.number()
            .required()
            .label('job'),

            candidate: Joi.number()
            .label('candidate'),

            created: Joi.date()
            .label('created'),

            referredbyemail: Joi.string()
            .min(10)
            .max(100)
            .email({tlds : {allow:['com']}})
            .default(null),

            notes: Joi.string()
            .min(10)
            .max(255)
            
        }),
        params: Joi.object({
            
        }),
        query: Joi.object({
            
        })
    },

    
    update: {
        body: Joi.object({
            job: Joi.number()
            .label('job'),

            candidate: Joi.number()
            .label('candidate'),

            created: Joi.date()
            .label('created'),

            referredbyemail: Joi.string()
            .min(10)
            .max(100)
            .email({tlds : {allow:['com']}})
            .default(null),

            notes: Joi.string()
            .min(10)
            .max(255)
            
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
