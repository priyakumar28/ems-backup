const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            type: Joi.string().min(3).regex(/^[a-zA-Z0-9\s]{1,128}$/).required().messages({
                "string.base": `"type" should be a type of string`,
                "string.min": `"type" must contain min of 3 characters`,
                "string.pattern.base": `"type" not allows special symbols`,
                "any.required": `"type" is a required field`
            }),
            name: Joi.string().min(3).regex(/^[a-zA-Z\s]{1,128}$/).required().messages({
                "string.base": `"name" should be a type of string`,
                "string.min": `"name" must contain min of 3 characters`,
                "string.pattern.base": `"name allows alphabates only`,
                "any.required": `"name" is a required field`
            }),
            textorig: Joi.string().min(3).regex(/^[a-zA-Z\s]{1,128}$/).messages({
                "string.base": `"textorig" should be a type of string`,
                "string.min": `"textorig" must contain min of 3 characters`,
                "string.pattern.base": `"textorig allows alphabates only`,
                "any.required": `"textorig" is a required field`
            }),
            textmapped: Joi.string().min(3).max(128).default(null),
            display: Joi.string().valid("Form", "Table and Form", "Hidden"),
            created: Joi.date(),
            updated: Joi.date()


        }),
        params: Joi.object({

        }),
        query: Joi.object({

        })
    },
    update: {
        body: Joi.object({
            type: Joi.string().regex(/^[a-zA-Z0-9\s]{1,128}$/),
            name: Joi.string().min(3).regex(/^[a-zA-Z\s]{1,128}$/),
            textorig: Joi.string().regex(/^[a-zA-Z\s]{1,128}$/),
            textmapped: Joi.string().min(3).max(128).default(null),
            display: Joi.string().valid("Form", "Table and Form", "Hidden"),
            created: Joi.date(),
            updated: Joi.date()


        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()

        })
    },
    delete: {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    getById: {
        query: Joi.object({
            id: Joi.number().required()
        })
    }
}