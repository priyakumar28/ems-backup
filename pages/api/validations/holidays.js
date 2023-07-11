const Joi = require('joi');

module.exports = {
    // POST /v1/employees/create
    create: {
        body: Joi.object({
            name: Joi.string().min(3).max(32).required().regex(/^[a-zA-Z\s]{3,32}$/).messages({
                "string.base": `"Name" should be a type of string`,
                "string.min": `"Name" must contain minmum of 3 characters`,
                "string.max": `"Name" must contain max of 32 characters`,
                "string.pattern.base": `"Name" must contain only alphabets`,
                "any.required": `"country" is a required field`
            }),
            dateh: Joi.date().messages({
                "date.base": `"dateh" should be a type of date`,
                "any.required": `"dateh" is a required field`
            }),
            status: Joi.string().valid('Full Day','Half Day').default("Full Day"),
            country: Joi.number().messages({
                "number.base": `"country" should be a type of date`,
                "any.required": `"country" is a required field`
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
            name: Joi.string().min(3).max(32).required().regex(/^[a-zA-Z\s]{3,32}$/).messages({
                "string.base": `"Name" should be a type of string`,
                "string.min": `"Name" must contain minmum of 3 characters`,
                "string.max": `"Name" must contain max of 32 characters`,
                "string.pattern.base": `"Name" must contain only alphabets`,
                "any.required": `"Name" is a required field`
            }),
            dateh: Joi.date().messages({
                "date.base": `"dateh" should be a type of date`,
                "any.required": `"dateh" is a required field`
            }),
            status: Joi.string().valid('Full Day', 'Half Day').default("Full Day"),
            country: Joi.number().messages({
                "number.base": `"country" should be a type of date`,
                "any.required": `"country" is a required field`
            }),
        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    
    remove: {
        body: Joi.object({
            name: Joi.string().regex( /^[a-zA-Z\s]{6,100}$/).required().label('Name'),
            dateh: Joi.date().label('dateh'),
            status: Joi.valid('Full Day','Half Day'),
            country: Joi.number().label('country')
            
        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    list: {
        body: Joi.object({
            name: Joi.string().regex( /^[a-zA-Z\s]{6,100}$/).required().label('Name'),
            dateh: Joi.date().label('dateh'),
            status: Joi.valid('Full Day','Half Day'),
            country: Joi.number().label('country')
            
        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            // 
        })
    },

    getById: {
        body: Joi.object({
            name: Joi.string().regex( /^[a-zA-Z\s]{6,100}$/).required().label('Name'),
            dateh: Joi.date().label('dateh'),
            status: Joi.valid('Full Day','Half Day'),
            country: Joi.number().label('country')
        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

};
