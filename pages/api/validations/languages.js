const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            
            name: Joi.string(100)
                     .default(null)
                     .label("name")
                     .messages({
                         "string.base": "This field has to be a string and it can hold upto 100 characters"
                     }),

            description: Joi.string(400)
                            .default(null)
                            .label("description")
                            .messages({
                                "string.base": "This field has to be a string and it can hold upto 400 characters"
                            }),
        })

    },

    update : {
        body: Joi.object({
            
            name: Joi.string(100)
                     .default(null)
                     .label("name")
                     .messages({
                         "string.base": "This field has to be a string and it can hold upto 100 characters"
                     }),

            description: Joi.string(400)
                            .default(null)
                            .label("description")
                            .messages({
                                "string.base": "This field has to be a string and it can hold upto 400 characters"
                            }),

        }),
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
        })
    },

    getById : {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"  
                   })
        })
    },
    
    delete : {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
        })
    }

};