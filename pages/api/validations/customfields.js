const Joi = require('joi');
const { max } = require('moment');
module.exports = {
    create: {
        body: Joi.object({
            type: Joi.string()
                .max(20)
                .regex(/^[a-zA-Z\s]{0,20}$/)
                .required()
                .label('Type')
                .messages({
                    "string.base": `"Type" should be a type of string`,
                    "string.max": `"Type" allowed maximum of 20 characters`,
                    "string.pattern.base": `"type" must contain only alphabets`,
                    "any.required": `"Type" is a required field`
                }),
            name: Joi.string()
                .max(20)
                .regex(/^[a-zA-Z\s]{0,20}$/)
                .required()
                .label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 20 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            data: Joi.string(),
            display: Joi.string().valid("Form", "Table and Form", "Hidden"),
            created: Joi.date(),
            updated: Joi.date(),
            field_type: Joi.string().max(20).regex(/^[a-zA-Z\s]{0,20}$/)
                .messages({
                    "string.base": `"FieldType" should be a type of string`,
                    "string.max": `"FieldType" allowed maximum of 20 characters`,
                    "string.pattern.base": `"FieldType" must contain only alphabets`,
                    "any.required": `"FieldType" is a required field`
                }),
            field_label: Joi.string().max(20).regex(/^[a-zA-Z\s]{0,20}$/)
                .messages({
                    "string.base": `"FieldType" should be a type of string`,
                    "string.max": `"FieldType" allowed maximum of 20 characters`,
                    "string.pattern.base": `"FieldType" must contain only alphabets`,
                    "any.required": `"FieldType" is a required field`
                }),
            field_validation: Joi.string().max(50).regex(/^[a-zA-Z\s]{0,50}$/)
                .messages({
                    "string.base": `"Field_validation" should be a type of string`,
                    "string.max": `"Field_validation" allowed maximum of 50 characters`,
                    "string.pattern.base": `"Field_validation" must contain only alphabets`,
                    "any.required": `"Field_validation" is a required field`
                }),
            field_options: Joi.string().max(500),
            display_order: Joi.number(),
            display_section: Joi.string().max(50).regex(/^[a-zA-Z\s]{0,50}$/)
                .messages({
                    "string.base": `"Field_validation" should be a type of string`,
                    "string.max": `"Field_validation" allowed maximum of 50 characters`,
                    "string.pattern.base": `"Field_validation" must contain only alphabets`,
                    "any.required": `"Field_validation" is a required field`
                }),
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
            name: Joi.string().max(20)
                .regex(/^[a-zA-Z\s]{0,20}$/)
                .label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 20 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            data: Joi.string(),
            display: Joi.string().valid("Form", "Table and Form", "Hidden"),
            created: Joi.date(),
            updated: Joi.date(),
            field_type: Joi.string().max(20).regex(/^[a-zA-Z\s]{0,20}$/)
                .messages({
                    "string.base": `"FieldType" should be a type of string`,
                    "string.max": `"FieldType" allowed maximum of 20 characters`,
                    "string.pattern.base": `"FieldType" must contain only alphabets`,
                    "any.required": `"FieldType" is a required field`
                }),
            field_label: Joi.string().max(20).regex(/^[a-zA-Z\s]{0,20}$/)
                .messages({
                    "string.base": `"FieldType" should be a type of string`,
                    "string.max": `"FieldType" allowed maximum of 20 characters`,
                    "string.pattern.base": `"FieldType" must contain only alphabets`,
                    "any.required": `"FieldType" is a required field`
                }),
            field_validation: Joi.string().max(50).regex(/^[a-zA-Z\s]{0,50}$/)
                .messages({
                    "string.base": `"Field_validation" should be a type of string`,
                    "string.max": `"Field_validation" allowed maximum of 50 characters`,
                    "string.pattern.base": `"Field_validation" must contain only alphabets`,
                    "any.required": `"Field_validation" is a required field`
                }),
            field_options: Joi.string().max(500),
            display_order: Joi.number(),
            display_section: Joi.string().max(50).regex(/^[a-zA-Z\s]{0,50}$/)
                .messages({
                    "string.base": `"Field_validation" should be a type of string`,
                    "string.max": `"Field_validation" allowed maximum of 50 characters`,
                    "string.pattern.base": `"Field_validation" must contain only alphabets`,
                    "any.required": `"Field_validation" is a required field`
                }),
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