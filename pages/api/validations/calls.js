const Joi = require('joi');
module.exports  = {
    create: {
        body: Joi.object({
             job: Joi.number()
             .required()
             
             .label('job'),

             candidate: Joi.number()
        //      .message({ "number.base": `"candidate" should be a type of number`,

        //    //  "number.max": `"candidate" must contain maximum of 32 characters`,

        //      "number.pattern.base": `"candidate" must contain only number`,

        //      "any.required": `"candidate" is a required field`})
             
             .label('candidate'),

             phone: Joi.string()
             .min(10)   
             .max(10)
             .regex( /^[0-9]+$/)
             .message({ "string.base": `"phone" should be a type of string`,

             "string.max": `"phone" must contain maximum of 32 characters`,

             "string.pattern.base": `"phone" must contain only number`,

             "any.required": `"phone" is a required field`})
             .label('phone'),

             created: Joi.date()
             .label('created'),

             updated: Joi.date()
             .label('updated'),

             status: Joi.string()
             .min(1)
             .max(255)
            
             .label('status'),

             notes: Joi.string()
             .min(1)
             .max(255)
             .label('notes'),


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

            phone: Joi.string()
            .min(10)
            .max(10)
            .regex( /^[0-9]+$/)
            .message({ "string.base": `"phone" should be a type of string`,

             "string.max": `"phone" must contain maximum of 32 characters`,

             "string.pattern.base": `"phone" must contain only number`,

             "any.required": `"phone" is a required field`})
            .label('phone'),

            created: Joi.date()
            .label('created'),
            
            updated: Joi.date()
            .label('updated'),

            status: Joi.string()
            .min(1)
            .max(255)
        
            .label('status'),

            notes: Joi.string()
            .min(1)
            .max(255)
            .label('notes'),

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
