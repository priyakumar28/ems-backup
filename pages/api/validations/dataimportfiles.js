const Joi = require('joi')

module.exports = {
    create: {
        body: Joi.object({
            name:Joi.string()
            .regex( /^[a-zA-Z\s]{6,32}$/)
            .min(1).max(60)
            .required()
            .label('name').messages({
                "string.base": `"Name" should be a type of string`,

                "string.min": `"Name" must contain minimum of 1 characters`,

                "string.max": `"Name" must contain maximum of 60 characters`,

                "string.pattern.base": `"Name" must contain only alphabets`,

                "any.required": `"Name" is a required field`
        }),
            data_import_definition: Joi.string().required()
                .max(200).label('Data_import_defination').messages({
                    "string.base": `"Data_import_defination" should be a type of string`,
    
                    "string.max": `"Data_import_defination" must contain maximum of 200 characters`,
    
                    "any.required": `"Data_import_defination" is a required field`
            }),
            status: Joi.string().regex(/^[a-zA-Z0-9\s]/)
                .max(15).label('Status').messages({
                    "string.base": `"Status" should be a type of string`,

                    "string.max": `"Status" must contain maximum of 15 characters`,
    
                    "string.pattern.base": `"Status" must contain only alphabets and numbers`,
    
                    "any.required": `"Status" is a required field`
            }),
            file: Joi.string()
                .max(100).label('File').messages({
                    "string.base": `"File" should be a type of string`,

                    "string.max": `"File" must contain maximum of 100 characters`,
            }),
            details: Joi.string().label('Details').messages({
                    "string.base": `"File" should be a type of string`
                }),
            updated: Joi.date().messages({
                "date.base":`"Updated" should be a type of date`
            }),
            created: Joi.date().messages({
                "date.base":`"Created" should be a type of date`
            }),
        }),

        params: Joi.object({

        }),
        query: Joi.object({

        })
    },

    update: {
        body: Joi.object({
            name:Joi.string()
            .regex( /^[a-zA-Z\s]{6,32}$/)
            .min(1).max(60)
            .required()
            .label('name').messages({
                "string.base": `"Name" should be a type of string`,

                "string.min": `"Name" must contain minimum of 1 characters`,

                "string.max": `"Name" must contain maximum of 60 characters`,

                "string.pattern.base": `"Name" must contain only alphabets`,

                "any.required": `"Name" is a required field`
        }),
            data_import_definition: Joi.string().required()
                .max(200).label('Data_import_defination').messages({
                    "string.base": `"Data_import_defination" should be a type of string`,
    
                    "string.max": `"Data_import_defination" must contain maximum of 200 characters`,
    
                    "any.required": `"Data_import_defination" is a required field`
            }),
            status: Joi.string().regex(/^[a-zA-Z0-9\s]/)
                .max(15).label('Status').messages({
                    "string.base": `"Status" should be a type of string`,

                    "string.max": `"Status" must contain maximum of 15 characters`,
    
                    "string.pattern.base": `"Status" must contain only alphabets and numbers`,
    
                    "any.required": `"Status" is a required field`
            }),
            file: Joi.string()
                .max(100).label('File').messages({
                    "string.base": `"File" should be a type of string`,

                    "string.max": `"File" must contain maximum of 100 characters`,
            }),
            details: Joi.string().label('Details').messages({
                    "string.base": `"File" should be a type of string`
                }),
            updated: Joi.date().messages({
                "date.base":`"Updated" should be a type of date`
            }),
            created: Joi.date().messages({
                "date.base":`"Created" should be a type of date`
            })
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
    }
}