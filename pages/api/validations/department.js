const joi = require('joi');

const stringMessage = (fieldName, min = null, max = null, pat = null) => {
    return {
        "string.base": fieldName + "should be a type of string",
        "string.empty": fieldName + " cannot be an empty field",
        "string.min": fieldName + " should have a minimum length of " + min,
        "string.max": fieldName + " should have a maximum length of " + max,
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
        body: joi.object({
            name: joi.string().required().max(200).messages(stringMessage("Name")),
            code: joi.string().required().max(20).messages(stringMessage("Code")),
            description: joi.string().max(100).allow(null).messages(stringMessage("Description")),
            status: joi.string().valid("Active", "In Active")
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
            name: joi.string().required().max(200).messages(stringMessage("Name")),
            code: joi.string().required().max(20).messages(stringMessage("Code")),
            description: joi.string().max(100).allow(null).messages(stringMessage("Description")),
            status: joi.string().valid("Active", "In Active")
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            id: joi.number().required().messages(numMessage("Id"))
        })
    },
    remove: {

        params: joi.object({
            //
        }),
        query: joi.object({
            id: joi.number().required().messages(numMessage("Id"))
        })
    },
    getById: {

        params: joi.object({
            //
        }),
        query: joi.object({
            id: joi.number().required().messages(numMessage("Id"))
        })
    }
}