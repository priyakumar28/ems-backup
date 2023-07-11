const { string } = require('joi');
const Joi = require('joi');

module.exports ={
    create:{
        body :Joi.object({
            name : Joi.string()
                .regex(/^[a-zA-Z]{3,30}$/)
                .required()
                .min(4)
                .max(250).label('name').messages({
                    "string.base" : `"Name" should be a type of string`,
                    "string.min" : `"Name" must contain minimum 4 characters`,
                    "string.max" : `"Name" should allow maximum 250 characters`,
                    "any.required" : `"Name" is  a required field`

                })
        }),
        params: Joi.object({
        }),
        query: Joi.object({ 
        })
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
            .min(4)
            .max(128)
            .label('name').messages({
                "string.base" : `"Name" should be a type of string`,
                "string.min" : `"Name" must contain minimum 4 characters`,
                "string.max" : `"Name" should allow maximum 250 characters`,
                "any.required" : `"Name" is  a required field`

            })
    }),
    params: Joi.object({

    }),
    query: Joi.object({
        id: Joi.number().required()

    })
}
}
