const { string, required } = require('joi');
const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number()
                .required()
                .messages({
                    "number.base": `"Employee" should be a type of number`,
                    "any.required": `"Employee" is a required field`
                }),
            name: Joi.string()
                .required()
                .min(1).regex(/^[a-zA-Z\s]{1,100}$/)
                .max(100).label('Name').messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" should allow maximum 100 characters`,
                    "any.required": `"Name" is a required field`,
                    "string.pattern.base": `"Name" must contain alphabets`
                }),
            relationship: Joi.string()
                .required()
                .max(64).label('Relationship').messages({
                    "string.base": `"Relationship" should be a type of string`,
                    "string.max": `"Relationship" should allow maximum 64 characters`,
                    "any.required": `"Relationship" is a required field`
                }),
            home_phone: Joi.string()
                .required()
                .min(7)
                .max(15).label('Home phone').messages({
                    "string.base": `"Home phone" should be a type of string`,
                    "string.min": `"Home phone" should be minimum 7 characters`,
                    "string.max": `"Home phone" should allow maximum 15 characters`,
                    "any.required": `"Home phone" is a required field`
                }),
            work_phone: Joi.string()
                .min(7)
                .max(15).label('Work phone').messages({
                    "string.base": `"Work phone" should be a type of string`,
                    "string.min": `"Work phone" should be minimum 7 characters`,
                    "string.max": `"Work phone" should allow maximum 15 characters`,
                    "any.required": `"Work phone" is a required field`
                }),
            mobile_phone: Joi.string()
                .min(7)
                .max(15).label('Mobile phone').messages({
                    "string.base": `"Mobile phone" should be a type of string`,
                    "string.min": `"Mobile phone" should be minimum 7 characters`,
                    "string.max": `"Mobile phone" should allow maximum 15 characters`,
                    "any.required": `"Mobile phone" is a required field`
                }),
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
    list: {
        params: Joi.object({
            id: Joi.number().required()
        }),
        query: Joi.object({

        })

    },
    update: {
        body: Joi.object({
            employee: Joi.number()
                .required()
                .messages({
                    "number.base": `"Employee" should be a type of number`,
                    "any.required": `"Employee" is a required field`
                }),
            name: Joi.string()
                .required()
                .min(3).regex(/^[a-zA-Z\s]{1,128}$/)
                .max(128).label('Name').messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.min": `"Name" should be minimum 6 characters`,
                    "string.max": `"Name" should allow maximum 128 characters`,
                    "any.required": `"Name" is a required field`,
                    "string.pattern.base": `"Name" must contain alphabets`

                }),
            relationship: Joi.string()
                .required()
                .max(128).label('Relationship').messages({
                    "string.base": `"Relationship" should be a type of string`,
                    "string.min": `"Relationship" should be minimum 6 characters`,
                    "string.max": `"Relationship" should allow maximum 128 characters`,
                    "any.required": `"Relationship" is a required field`
                }),
            home_phone: Joi.string()
                .required()
                .min(10)
                .max(12).label('Home phone').messages({
                    "string.base": `"Home phone" should be a type of string`,
                    "string.min": `"Home phone" should be minimum 6 characters`,
                    "string.max": `"Home phone" should allow maximum 128 characters`,
                    "any.required": `"Home phone" is a required field`
                }),
            work_phone: Joi.string()
                .min(10)
                .max(12).label('Work phone').messages({
                    "string.base": `"Work phone" should be a type of string`,
                    "string.min": `"Work phone" should be minimum 6 characters`,
                    "string.max": `"Work phone" should allow maximum 128 characters`,
                    "any.required": `"Work phone" is a required field`
                }),
            mobile_phone: Joi.string()
                .min(10)
                .max(12).label('Mobile phone').messages({
                    "string.base": `"Mobile phone" should be a type of string`,
                    "string.min": `"Mobile phone" should be minimum 6 characters`,
                    "string.max": `"Mobile phone" should allow maximum 128 characters`,
                    "any.required": `"Mobile phone" is a required field`
                }),
        }),


        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    }
};
