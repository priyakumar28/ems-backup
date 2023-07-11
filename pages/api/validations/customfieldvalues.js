const Joi = require('joi')
module.exports = {
    create: {
        body: Joi.object({
            type: Joi.string().max(20)
                .regex(/^[a-zA-Z\s]{0,20}$/)
                .required()
                .label('Type')
                .messages({
                    "string.base": `"Type" should be a type of string`,
                    "string.max": `"Type" allowed maximum of 20 characters`,
                    "string.pattern.base": `"type" must contain only alphabets`,
                    "any.required": `"Type" is a required field`
                }),
            name: Joi.string().max(60)
                .regex(/^[a-zA-Z\s]{0,60}$/)
                .required()
                .label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 20 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            object_id: Joi.string().max(60)
                .required()
                .label('Object_Id')
                .messages({
                    "string.base": `"Object_id" should be a type of string`,
                    "string.max": `"Object_id" allowed maximum of 60 characters`,
                    "any.required": `"Object_id" is a required field`
                }),
            value: Joi.string().label('Value')
                .messages({ "string.base": `"Value" should be a type of string` }),
            updated: Joi.date(),
            created: Joi.date(),
        }),
    },
    update: {
        body: Joi.object({
            type: Joi.string().max(20)
                .regex(/^[a-zA-Z\s]{0,20}$/)
                .label('Type')
                .messages({
                    "string.base": `"Type" should be a type of string`,
                    "string.max": `"Type" allowed maximum of 20 characters`,
                    "string.pattern.base": `"type" must contain only alphabets`,
                    "any.required": `"Type" is a required field`
                }),
            name: Joi.string().max(60)
                .regex(/^[a-zA-Z\s]{0,60}$/)
                .label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 20 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            object_id: Joi.string().max(60)
                .label('Object_id')
                .messages({
                    "string.base": `"Object_id" should be a type of string`,
                    "string.max": `"Object_id" allowed maximum of 60 characters`,
                    "any.required": `"Object_id" is a required field`
                }),
            value: Joi.string().messages({ "string.base": `"Value" should be a type of string` }),
            updated: Joi.date(),
            created: Joi.date(),
        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()

        }),
    },
    delete: {
        body: Joi.object({

        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()

        }),
    },
    getById: {
        params: Joi.object({


        }),
        query: Joi.object({
            id: Joi.number().required()

        }),
    },
};