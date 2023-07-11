
const Joi = require('joi');


module.exports = {
    create:{
        body: Joi.object({
            time : Joi.date().messages({
                "date.base" : `"Time" should be a date type`,
            }),
            fromuser : Joi.number().messages({
                "number.base" : `"FromUser" should be a number type`,
            }),
            fromemployee : Joi.number().messages({
                "number.base" : `"FromEmployee" should be a number type`
            }),
            touser : Joi.number().messages({
                "number.base" : `"touser" should be a number type`
            }),
            image : Joi.string().min(3).max(500).messages({
                "string.base" : `"Image" should be a string type`,
                "string.min" : `"Image" should be minimum 3 charaters`,
                "string.max" : `"Image" shoulde be maximum 500 charaters`,
            }),
            message : Joi.string().min(3).max(200).messages({
                "string.base" : `"Message" should be a string type`,
                "string.min" : `"Message" mest conatin minimum 3 characters`,
                "string.max" : `"Message" should be maximum 200 characters`,
            }),
            action : Joi.string().min(3).max(200).messages({
                "string.base" : `"Action" should be a string type`,
                "string.min" : `"Action" mest conatin minimum 3 characters`,
                "string.max" : `"Action" should be maximum 200 characters`,
        
            }),
            type : Joi.string().min(3).max(100).messages({
                "string.base" : `"Type" should be a string type`,
                "string.min" : `"Type" mest conatin minimum 3 characters`,
                "string.max" : `"Type" should be maximum 200 characters`,
        
            }),
            status : Joi.valid("Unread","Read").messages({
                "valid.base" : `"status" `,
            }),
            employee : Joi.number().required().messages({
                "number.base" : `"Employee" shoulde be a number type`,
                "any.required" : `"Employee" is a required field`
            })
        }),
        params : Joi.object({
        }),
        query : Joi.object({
        })
    },

    getById : {
        params : Joi.object({

        }),
        query  : Joi.object({
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
    update: {
        body : Joi.object({
            time : Joi.date().messages({
                "date.base" : `"Time" should be a date type`,
            }),
            fromuser : Joi.number().messages({
                "number.base" : `"FromUser" should be a number type`,
            }),
            fromemployee : Joi.number().messages({
                "number.base" : `"FromEmployee" should be a number type`
            }),
            touser : Joi.number().messages({
                "number.base" : `"touser" should be a number type`
            }),
            image : Joi.string().min(3).max(500).messages({
                "string.base" : `"Image" should be a string type`,
                "string.min" : `"Image" should be minimum 3 charaters`,
                "string.max" : `"Image" shoulde be maximum 500 charaters`,
            }),
            message : Joi.string().min(3).max(200).messages({
                "string.base" : `"Message" should be a string type`,
                "string.min" : `"Message" mest conatin minimum 3 characters`,
                "string.max" : `"Message" should be maximum 200 characters`,
        
            }),
            action : Joi.string().min(3).max(200).messages({
                "string.base" : `"Action" should be a string type`,
                "string.min" : `"Action" mest conatin minimum 3 characters`,
                "string.max" : `"Action" should be maximum 200 characters`,
        
            }),
            type : Joi.string().min(3).max(100).messages({
                "string.base" : `"Type" should be a string type`,
                "string.min" : `"Type" mest conatin minimum 3 characters`,
                "string.max" : `"Type" should be maximum 200 characters`,
        
            }),
            status : Joi.valid("Unread","Read").messages({
                "valid.base" : `"status" `,
            }),
            employee : Joi.number().required().messages({
                "number.base" : `"Employee" shoulde be a number type`,
                "any.required" : `"Employee" is a required field`
            })
        }),
        params : Joi.object({

        }),
        query : Joi.object({
            id: Joi.number().required()
        })
    }        
}