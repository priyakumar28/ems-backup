const Joi = require('joi');

module.exports = {
    create: { 
        body: Joi.object({
            name: joi.string().required().max(32).regex(/^[a-zA-Z\s]{3,100}$/).default(null).messages({

                "string.base": `"Name" should be a type of string`,

                "string.max": `"Name" must contain maximum of 32 characters`,

                "string.pattern.base": `"Name" must contain only alphabets`,

                "any.required": `"Name" is a required field`

            }),

            description: Joi.string()
                .required()
                .min(10)
                .max(400)
                .regex(/^[A-Za-z0-9\s]{3,400}$/)
                .label('description'),

            }),
            params: Joi.object({
                
            }),
            query: Joi.object({
                
            })
    
    },

    update:{
        body:Joi.object({
            name: joi.string().required().max(32).regex(/^[a-zA-Z\s]{3,100}$/).default(null).messages({

                "string.base": `"Name" should be a type of string`,

                "string.max": `"Name" must contain maximum of 32 characters`,

                "string.pattern.base": `"Name" must contain only alphabets`,

                "any.required": `"Name" is a required field`

            }),

            description: Joi.string()
                .min(10)
                .max(400)
                .regex(/^[A-Za-z0-9\s]{3,50}$/)
                .label('description'),

            }),
            params: Joi.object({
                 
            }),
            query: Joi.object({
                id:Joi.number()
                .required()  
                
        })
    },

    getById:{
        params: Joi.object({
            
        }),
        query: Joi.object({
            id:Joi.number()
            .required()  
        })
    },

    delete:{
        params: Joi.object({
           
        }),
        query: Joi.object({
            id:Joi.number()
            .required()  
        })

    }
    



};