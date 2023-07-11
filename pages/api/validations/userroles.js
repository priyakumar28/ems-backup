const joi = require('joi');


module.exports = {
    createOrUpdate: {
        body: joi.object({
            name: joi.string().max(100).regex(/^[a-zA-Z\s]{2,100}$/).messages({
                "string.base": `"Name" should be a type of string`,
                "string.max":`"Name should contain max of 100 characters`,
                "string.pattern.base": `"Name" must contain only alphabets and minimum of 2 letters`
            }),
            id: joi.number(),
            modules: joi.array().allow(null)
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            // 
        })
    },
    remove: {

        params: joi.object({
            //
        }),
        query: joi.object({
            id: joi.number().required().messages({'any.number': 'Id must be a number type'})
        })
    },
    getById: {

        params: joi.object({
            //
        }),
        query: joi.object({
            id: joi.number().required().messages({'any.number': 'Id must be a number type'})
        })
    }
}



//regex( /^[a-zA-Z\s]{5,100}$/)