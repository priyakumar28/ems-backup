const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            name:Joi.string()
                .regex( /^[a-zA-Z\s]{1,32}$/)
                .min(1).max(32)
                .required()
                .label('name').messages({
                    "string.base": `"Name" should be a type of string`,

                    "string.min": `"Name" must contain minimum of 3 characters`,
    
                    "string.max": `"Name" must contain maximum of 60 characters`,
    
                    "string.pattern.base": `"Name" must contain only alphabets`,
    
                    "any.required": `"Name" is a required field`
            }),
            datatype: Joi.string().required()
                    .max(60).label('Datatype').messages({
                        "string.base": `"Datatype" should be a type of string`,
    
                        "string.max": `"Datatype" must contain maximum of 60 characters`,

                        "any.required": `"Datatype" is a required field`
    
                    }),
            details: Joi.string()
                    .label('Details').messages({
                        "string.base": `"Details" should be a type of string`
                    }),
            columns: Joi.string()
                    .label('Columns').messages({
                        "string.base": `"Columns" should be a type of string`
                    }),
            updated: Joi.date().messages({
                "date.base": `"Update" should be a type of date`
            }),
            created: Joi.date().messages({
                "date.base": `"Created" should be a type of date`
            })
        }),

        params : Joi.object({

        }),

        query : Joi.object({

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

    update: {
        body: Joi.object({
            name:Joi.string()
                .regex( /^[a-zA-Z\s]{6,32}$/)
                .min(1).max(60)
                .required()
                .label('name').messages({
                    "string.base": `"Name" should be contain alphabets only`,
                    "string.min": `"Name" must contain minimum of 1 characters`,
                    "string.max": `"Name" must contain maximum of 60 characters`,
                    "any.required": `"Name" is a required field`
                }),
        datatype: Joi.string().required()
                .max(60).label('Datatype').messages({
                    "string.base": `"Datatype" should be a type of string`,
                    "string.max": `"Datatype" must contain maximum of 60 characters`,
                    "any.required": `"Datatype" is a required field`
                }),
        details: Joi.string()
                .label('Details').messages({
                    "string.base": `"Details" should be a type of string`
                }),
        columns: Joi.string()
                .label('Columns').messages({
                    "string.base": `"Columns" should be a type of string`
                }),
        updated: Joi.date().messages({
            "date.base": `"Update" should be a type of string`
        }),
        created: Joi.date().messages({
            "date.base": `"Created" should be a type of string`
        })
        })
    }
}