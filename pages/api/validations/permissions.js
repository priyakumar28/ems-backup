const Joi = require('joi');


const stringMessage = (fieldName, min=null,max=null,pat=null) => {
    return {
       "string.base": fieldName + "should be a type of string",
       "string.empty": fieldName + " cannot be an empty field",
       "string.min": fieldName + " should have a minimum length of " + min,
       "string.max": fieldName + " should have a minimum length of " + max,
       "string.pattern.base": fieldName + " must contain only" + pat,
       "string.alphanum": fieldName + " must contain only alphanumeric",
       "any.valid": fieldName + " contains invalid values",
       "string.email": fieldName + " must be a valid one",
       "any.required": fieldName + " is a required field"
    }
 };
 const numMessage = (fieldName) => {
    return {
       "number.base": fieldName + " should be a type of number",
       "any.required": fieldName + " is a required field"
    }
 };


module.exports = {
    create: {
        body: Joi.object({
            user_level: Joi.valid("Admin", "Employee", "Manager"),

            user_role: Joi.number().messages({
                "number.base" : `"User_role" should be a number type`
            }),

            module_id: Joi.number().required().messages({
                "number.base" : `"Module_id" should be a number type`,
                "any.required" : `"Module_id" should be a required field`
            }),

            permissions: Joi.array().items(Joi.string().valid('*', 'read', 'save', 'delete')).required().messages((stringMessage("Permissions"))),

            meta: Joi.string().min(1).max(500).messages({
                "string.base" : `"Meta" shoulde be a string type`,
                "string.min" : `"Meta" should contain minimum 1 character`,
                "string.max" : `"Meta" should be maximum 500 characters`
            }),

            value: Joi.string().min(1).max(200).messages({
                "string.base" : `"Value" shoulde be a string type`,
                "string.min" : `"Value" should contain minimum 1 character`,
                "string.max" : `"Value" should be maximum 200 characters`

            })
        }),
        params: Joi.object({
        }),
        query: Joi.object({
        })
    },
    remove: {
        params: Joi.object({

        }),
        query: Joi.object({
            //
        })
    },
    list: {
        params: Joi.object({
        }),
        query: Joi.object({

        })
    },
    update: {
        body: Joi.object({
            user_level: Joi.valid("Admin", "Employee", "Manager"),

            user_role: Joi.number().messages({
                "number.base" : `"User_role" should be a number type`
            }),

            module_id: Joi.number().messages({
                "number.base" : `"Module_id" should be a number type`,
                "any.required" : `"Module_id" should be a required field`
            }),

            permissions: Joi.array().items(Joi.string().valid('*', 'read', 'save', 'delete')).required().messages((stringMessage("Permissions"))),

            meta: Joi.string().min(1).max(500).messages({
                "string..base" : `"Meta" shoulde be a string type`,
                "string.min" : `"Meta" should contain minimum 1 character`,
                "string.max" : `"Meta" should be maximum 500 characters`
            }),

            value: Joi.string().min(1).max(200).messages({
                "string..base" : `"Value" shoulde be a string type`,
                "string.min" : `"Value" should contain minimum 1 character`,
                "string.max" : `"Value" should be maximum 200 characters`

            })
        }),
        params: Joi.object({

        }),
        query: Joi.object({
        })
    }
}