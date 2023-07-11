const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            name:Joi.string()
                .regex( /^[a-zA-Z\s]{0,32}$/)
                .min(1).max(100)
                .required()
                .label('name').messages({
                        "string.base": `"Name" should be a type of string`,

                        "string.min": `"Name" must contain minimum of 1 characters`,
        
                        "string.max": `"Name" must contain maximum of 100 characters`,
        
                        "string.pattern.base": `"Name" must contain only alphabets`,
        
                        "any.required": `"Name" is a required field`
                }),
            description: Joi.string()
                .required()
                .min(1)
                .max(400).label('Dscription').messages({
                    "string.base": `"Description" should be a type of string`,

                    "string.min": `"Description" must contain minimum of 1 characters`,
        
                    "string.max": `"Description" must contain maximum of 400 characters`,
    
                    "any.required": `"Description" is a required field`
                })
        }),

        params: Joi.object({
                
        }),
        query: Joi.object({
                
        })
    },

    getById: {
        params: Joi.object({
            
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    remove: {
        params: Joi.object({
            
        }),
        query: Joi.object({

            id: Joi.number().required()

        })
    },


    update: {
        body :Joi.object({
           name:Joi.string()
                .regex( /^[a-zA-Z\s]{6,32}$/)
                .min(1).max(100)
                .required()
                .label('name').messages({
                        "string.base": `"Name" should be a type of string`,

                        "string.min": `"Name" must contain minimum of 1 characters`,
        
                        "string.max": `"Name" must contain maximum of 100 characters`,
        
                        "string.pattern.base": `"Name" must contain only alphabets`,
        
                        "any.required": `"Name" is a required field`
                }),
             description: Joi.string()
                .required()
                .min(1)
                .max(400).label('Dscription').messages({
                    "string.base": `"Description" should be a type of string`,

                    "string.min": `"Description" must contain minimum of 1 characters`,
        
                    "string.max": `"Description" must contain maximum of 400 characters`,
    
                    "string.pattern.base": `"Description" must contain only alphabets`,
    
                    "any.required": `"Description" is a required field`
                })
        }),

        params: Joi.object({

        }),
        query: Joi.object({

            id: Joi.number().required()

        })
            
    }
};