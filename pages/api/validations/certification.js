const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            name: Joi.string().required().min(3).max(100).label('name').messages({
                "string.base": `"Name" should be a type of string`,
                "string.min": `"Name" must contain minimum of 3 characters`,
                "string.max": `"Name" must contain maximum of 100 characters`,
                "any.required": `"Name" is a required field`
            }),
            description: Joi.string().allow(null).min(3).max(400).label('description').messages({
                "string.base": `"Description" should be a type of string`,
                "string.min": `"Description" must contain minimum of 3 characters`,
                "string.max": `"Description" must contain maximum of 400 characters`,
            }),
        }),
        params: Joi.object({

        }),
        query: Joi.object({

        })
    },
    update: {
        body: Joi.object({
            name: Joi.string().required().min(3).max(100).label('name').messages({
                "string.base": `"Name" should be a type of string`,
                "string.min": `"Name" must contain minimum of 3 characters`,
                "string.max": `"Name" must contain maximum of 100 characters`,
                "any.required": `"Name" is a required field`
            }),
            description: Joi.string().allow(null).min(3).max(400).label('description').messages({
                "string.base": `"Description" should be a type of string`,
                "string.min": `"Description" must contain minimum of 3 characters`,
                "string.max": `"Description" must contain maximum of 400 characters`,
            }),
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
};