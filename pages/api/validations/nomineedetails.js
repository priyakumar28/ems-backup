const { string, required } = require('joi');
const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({

            name: Joi.string()
                .required().min(1)
                .max(100).regex(/^[a-zA-Z\s]{1,100}$/)
                .label('name')
                .messages({
                    "string.base": "This field has to be a string",
                    "string.max": "This field cannot have more than 100 characters",
                    "any.required": "This field is mandatory",
                    "string.pattern.base": `Name must contain alphabets`
                }),
            
            employee: Joi.number()
                .required()
                .label('employee')
                .messages({}),
            
            state: Joi.string()
                .required()
                .max(100).regex(/^[a-zA-Z\s]{1,70}$/)
                .label('state')
                .messages({"string.pattern.base": `State must contain alphabets`}),
            
            district: Joi.string()
                .required()
                .max(100).regex(/^[a-zA-Z\s]{1,70}$/)
                .label('district')
                .messages({"string.pattern.base": `District must contain alphabets`}),
            
            address_pincode: Joi.string()
                .required()
                .max(200)
                .label('address_pincode')
                .messages({}),
            
            phone: Joi.string()
                .required()
                .regex(/^[0-9\s]{1,17}$/)
                .max(15)
                .label('phone')
                .messages({}),
            
            relationship: Joi.string()
                .required()
                .label('relationship')
                .valid("Father", "Mother", "Uncle", "Aunt", "Guardian", "Grandfather", "Grandmother")
                .messages({})
        })
    },
    update: {
        body: Joi.object({

            name: Joi.string()
                .required()
                .max(100).regex(/^[a-zA-Z\s]{1,100}$/)
                .label('name')
                .messages({
                    "string.base": "This field has to be a string",
                    "string.max": "This field cannot have more than 100 characters",
                    "any.required": "This field is mandatory",
                    "string.pattern.base": `Name must contain alphabets`
                }),
            
            employee: Joi.number()
                .required()
                .label('employee')
                .messages({}),
            
            state: Joi.string()
                .required()
                .max(100).regex(/^[a-zA-Z\s]{1,100}$/)
                .label('state')
                .messages({"string.pattern.base": `State must contain alphabets`}),
            
            district: Joi.string()
                .required()
                .max(100).regex(/^[a-zA-Z\s]{1,100}$/)
                .label('district')
                .messages({"string.pattern.base": `District must contain alphabets`}),
            
            address_pincode: Joi.string()
                .required()
                .max(200)
                .label('address_pincode')
                .messages({}),
            
            phone: Joi.string()
                .required()
                .regex(/^[0-9\s]{1,17}$/)
                .max(15)
                .label('phone')
                .messages({}),
            
            relationship: Joi.string()
                .required()
                .max(50)
                .label('relationship')
                .valid("Father", "Mother", "Uncle", "Aunt", "Guardian", "Grandfather", "Grandmother")
                .messages({})
        }),
        query: Joi.object({
            id: Joi.number().required()
        }),
    },
    getById: {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    delete: {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
}