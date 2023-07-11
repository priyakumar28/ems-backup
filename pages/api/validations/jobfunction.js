const Joi = require('joi');

module.exports = {
    create: { 
        body: Joi.object({
            name: Joi.string().required().max(32).regex(/^[a-zA-Z\s]{3,100}$/).default(null).messages({

                "string.base": `"Name" should be a type of string`,

                "string.max": `"Name" must contain maximum of 32 characters`,

                "string.pattern.base": `"Name" must contain only alphabets`,

                "any.required": `"Name" is a required field`

            })
            }),
            params: Joi.object({
                
            }),
            query: Joi.object({
                
            })
    },

    update:{
        body:Joi.object({
            name: Joi.string().required().max(32).regex(/^[a-zA-Z\s]{3,100}$/).default(null).messages({

                "string.base": `"Name" should be a type of string`,

                "string.max": `"Name" must contain maximum of 32 characters`,

                "string.pattern.base": `"Name" must contain only alphabets`,

                "any.required": `"Name" is a required field`

            })
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
}