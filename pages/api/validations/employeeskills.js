const joi = require('joi');

const stringMessage = (fieldName, min = null, max = null, pat = null) => {
    return {
        "string.base": fieldName + " should be a type of string",
        "string.empty": fieldName + " cannot be an empty field",
        "string.min": fieldName + " should have a minimum length of " + min,
        "string.max": fieldName + " should have a maximum length of " + max,
        "string.pattern.base": fieldName + " must contain only" + pat,
        "string.alphanum": fieldName + " must contain only alphabets and numbers",
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
const dateMessage = (fieldName) => {
    return {
        "date.base": fieldName + " should be a type of date",
        "any.required": fieldName + " is a required field"
    }
};

module.exports = {
    create: {
        body: joi.object({
            skill_name: joi.string().min(2).max(32).regex(/^[a-zA-Z\s]{2,32}$/).messages(numMessage('Name')),
            employee: joi.number().required().messages(numMessage('Employee')),
            is_certified: joi.string().valid("Yes", "No").messages(numMessage('Is certified')),
            attachment: joi.any().messages(stringMessage('Attachment')),
            date_start: joi.date().allow(null).messages({
                "date.base": `"Valid from" should be a type of date`,
                "any.required": `"Valid from" is a required field`
            }),
            date_end: joi.date().allow(null).min(joi.ref('date_start')).messages({
                "date.base": `"Valid through" should be a type of date`,
                "any.required": `"Valid through" is a required field`
            }),
            details: joi.string().allow(null).min(3).max(250).messages(stringMessage('Details'))
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            //
        })
    },
    update: {
        body: joi.object({
            skill_name: joi.string().min(2).max(32).messages(numMessage('Name')),
            employee: joi.number().required().messages(numMessage('Employee')),
            is_certified: joi.string().valid("Yes", "No").messages(numMessage('Is certified')),
            attachment: joi.any().messages(stringMessage('Attachment')),
            date_start: joi.date().allow(null).messages({
                "date.base": `"Valid from" should be a type of date`,
            }),
            date_end: joi.date().allow(null).min(joi.ref('date_start')).messages({
                "date.base": `"Valid through" should be a type of date`
            }),
            details: joi.string().allow(null).min(3).max(250).messages(stringMessage('Details'))
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            id: joi.number().required().messages(numMessage('Id'))
        })
    },
    remove: {
        query: joi.object({
            id: joi.number().required().messages(numMessage('Id'))
        })
    },
    getById: {
        query: joi.object({
            id: joi.number().required().messages(numMessage('Id'))
        })
    }
}