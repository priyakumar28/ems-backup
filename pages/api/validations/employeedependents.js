const { required } = require('joi');
const Joi = require('joi');
const { max } = require('pg/lib/defaults');

module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number()
                .required().
                label('Employee')
                .messages({
                    "number.base": `"Employee" should be a type of number`,
                    "any.required": `"Employee" is required field`
                }),
            name: Joi.string()
                .max(30)
                .regex(/^[a-zA-Z\s]{0,30}$/)
                .required()
                .label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 30 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            relationship: Joi.string().valid('Child', 'Spouse', 'Parent', 'Other'),
            dob: Joi.date()
                .required()
                .label('Dob')
                .messages({ "date.base": `"Dob" should be in valid date format(yyyy:mm:dd)` }),
            id_number: Joi.string().max(25)
                .regex(/^[a-zA-Z0-9]{0,25}$/)
                .required()
                .label('Id_Number')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 30 characters`,
                    "string.pattern.base": `"Name" Sholud contain alphabets and numbers only`,
                    "any.required": `"Name" is a required field`
                }),
        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            //
        })
    },

    update: {
        body: Joi.object({
            employee: Joi.number().label('Employee')
                .messages({
                    "number.base": `"Employee" should be a type of number`,
                    "any.required": `"Employee" is required field`
                }),
            name: Joi.string().max(30)
                .regex(/^[a-zA-Z\s]{0,30}$/)
                .label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 30 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            relationship: Joi.string().valid('Child', 'Spouse', 'Parent', 'Other'),
            dob: Joi.date().label('Dob')
                .messages({ "date.base": `"Dob" should be in valid date format(yyyy:mm:dd)` }),
            id_number: Joi.string().max(25)
                .regex(/^[a-zA-Z0-9]{0,25}$/)
                .label('Id_Number')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" allowed maximum of 30 characters`,
                    "string.pattern.base": `"Name" Sholud contain alphabets and numbers only`,
                    "any.required": `"Name" is a required field`
                }),
        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })


    },
    delete: {
        body: Joi.object({

        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required(),
        })

    },
    getById: {
        params: Joi.object({

        }),

        query: Joi.object({
            id: Joi.number().required()
        })
    }


}