const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            name: Joi.string().min(3).regex(/^[a-zA-Z\s]{1,128}$/).required().messages({
                "string.base": `"name" should be a type of string`,
                "string.min": `"name" must contain min of 3 characters`,
                "string.pattern.base": `"name" must contain alphabates only`,
                "any.required": `"name" is a required field`
            }),
            created: Joi.date(),
            updated: Joi.date(),
            pre_approve: Joi.valid("Yes", "No")
        })
    },

    update: {
        body: Joi.object({
            name: Joi.string().min(3).regex(/^[a-zA-Z\s]{1,128}$/).required().messages({
                "string.base": `"name" should be a type of string`,
                "string.min": `"name" must contain min of 3 characters`,
                "string.pattern.base": `"name" must contain alphabates only`,
                "any.required": `"name" is a required field`
            }),
        }),
        query: Joi.object({
            id: Joi.number().required()
        }),

    },
    getById: {
        query: Joi.object({
            id: Joi.number().required()
        }),
    },

    delete: {
        query: Joi.object({
            id: Joi.number().required()
        }),
    }

}