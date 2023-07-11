const Joi = require('joi');

module.exports = {
    create:{
    body :Joi.object({
        name : Joi.string()
            .regex(/^[a-zA-Z]{3,30}$/)
            .required()
            .min(1)
            .max(500).label('name').messages({
                "string.base" : `"Name" should be a type of string`,
                "string.min" : `"Name" must contain minimum 1 character`,
                "string.max" : `"Name" should be maximum 500 characters`,
                "any.required" : `"Name" should be a required field`
            }),
        created : Joi.date()
            .label('created').messages({
                "date.base" : `"Created" should be a date type`
            }),
        updated : Joi.date()
           .label('updated').messages({
               "date.base" : `"Updated" should be a date type`
           })
    }),
        params : Joi.object({}),
        query : Joi.object({})
        },
    getById: {
        params:Joi.object({
           
        }),
        query:Joi.object({
            id: Joi.number().required()
        })
    },
    remove:{
        params: Joi.object({
          
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    list:{
        params:Joi.object({
        }),
        query: Joi.object({
            
        })
    },
    update : {
        body :Joi.object({
        name : Joi.string()
            .regex(/^[a-zA-Z]{3,30}$/)
            .required()
            .min(1)
            .max(500)
            .label('name').messages({
                "string.base" : `"Name" should be a type of string`,
                "string.min" : `"Name" must contain minimum 1 character`,
                "string.max" : `"Name" should be maximum 500 characters`,
                "any.required" : `"Name" should be a required field`
            }),
        created : Joi.date()
            .label('created').messages({
                "date.base" : `"Created" should be a date type`
            }),
        updated : Joi.date()
           .label('updated').messages({
            "date.base" : `"Updated" should be a date type`
        })
    }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
        }
    }
