const Joi = require('joi');

module.exports = {
    // POST /v1/employees/create
    create: {
        body: Joi.object({
            name: Joi.string().required().min(3).max(400).regex(/^[a-zA-Z\s]{3,400}$/).default(null).messages({
                "string.base": `"name" should be a type of string`,
                "string.min": `"name" must contain minmum of 3characters`,
                "string.max": `"name" must contain max of 400 characters`,
                "string.pattern.base": `"name" must contain only alphabets`,
                "any.required": `"name" is a required field`
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
        name: Joi.string().required().min(3).max(400).regex(/^[a-zA-Z\s]{3,400}$/).default(null).messages({
            "string.base": `"name" should be a type of string`,
            "string.min": `"name" must contain minmum of 3characters`,
            "string.max": `"name" must contain max of 400 characters`,
            "string.pattern.base": `"name" must contain only alphabets`,
            "any.required": `"name" is a required field`
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
        name: Joi.string().regex( /^[a-zA-Z\s]{6,128}$/)
            .required()
            .label('Name'),
        
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
        name: Joi.string().regex( /^[a-zA-Z\s]{6,128}$/)
            .required()
            .label('Name'),
        
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
        name: Joi.string().regex( /^[a-zA-Z\s]{6,128}$/)
            .required()
           .label('Name'),
        
    }),
    params: Joi.object({
        //
    }),
    query: Joi.object({
        id: Joi.number().required()
    })
},

};
