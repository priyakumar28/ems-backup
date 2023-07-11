const Joi = require('joi');

module.exports ={
    create:{
        body: Joi.object({
            name: Joi.string(100)
                     .required()
                     .label('name')
                     .messages({
                         "string.base": "This field must be a string that can hold upto 100 characters.",
                         "any.required": "This field is required."
                     })
        })
    },
    update:{
        body: Joi.object({
            name: Joi.string(100)
                     .required()
                     .label('name')
                     .messages({
                         "string.base": "This field must be a string that can hold upto 100 characters.",
                         "any.required": "This field is required."
                     })
        }),
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
        })
    },
    getById: {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.field":"Here query is required"
                   })
        })
    },
    delete: {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.field":"Here query is required"
                   })
        })
    }
}