const Joi = require('joi');

module.exports = {
    create:{
        body: Joi.object({
            name : Joi.string().min(4).max(250).messages({
                "string.base" : `"Name" should be a string type`,
                "string.min" : `"Name" should be minimum 4 characters`,
                "string.max" : `"Name" should be maximum 250 characters`
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

    remove:{
        params: Joi.object({

        }),
        query:Joi.object({
            id: Joi.number().required()
        })
    },

    list:{
        params:Joi.object({

        }),
        query: Joi.object({

        })
    },

    update:{
        body: Joi.object({
            name: Joi.string().min(4).max(250).messages({
                "string.base" : `"Name" should be a string type`,
                "string.min" : `"Name" should be minimum 4 characters`,
                "string.max" : `"Name" should be maximum 250 characters`
            })
        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    }
}