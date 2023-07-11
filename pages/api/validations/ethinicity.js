const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            name: Joi.string().required().min(3).max(128).regex(/^[a-zA-z\s]{3,30}/).label('name').messages({
                "string.base": `"name" should be a type of string`,
                "string.min": `"name" must contain min of 3 characters`,
                "string.pattern.base": `"name" must contain alphabates only`,
                "any.required": `"name" is a required field`
            }),
        }),
        params: Joi.object({
            id: Joi.number().required()

        })
    },
    update: {
        body: Joi.object({
            name: Joi.string().required().min(3).max(128).regex(/^[a-zA-z\s]{3,30}/).label('name').messages({
                "string.base": `"name" should be a type of string`,
                "string.min": `"name" must contain min of 3 characters`,
                "string.pattern.base": `"name" must contain alphabates only`,
                "any.required": `"name" is a required field`
            }),
        }),
        params: Joi.object({


        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    getById: {
        query: Joi.object({
            id: Joi.number().required()

        })
    },
    delete: {
        query: Joi.object({
            id: Joi.number().required()
        })
    }
}