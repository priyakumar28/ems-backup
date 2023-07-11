const joi = require('joi');

const stringMessage = (fieldName, min = null, max = null, pat = null) => {
    return {
        "string.base": fieldName + "should be a type of string",
        "string.empty": fieldName + " cannot be an empty field",
        "string.min": fieldName + " should have a minimum length of " + min,
        "string.max": fieldName + " should have a maximum length of " + max,
        "string.pattern.base": fieldName + " must contain only 4 to 100 alphabets numbers and underscores",
        "string.alphanum": fieldName + " must contain only alphabets and numbers",

        "string.email": fieldName + " must be a valid one",
        "any.required": fieldName + " is a required field",
        "any.*": fieldName + " contains invalid values",
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
            username: joi.string().regex(/^[A-Za-z0-9_.]{4,100}$/).messages(stringMessage("UserName")),
            email: joi.string().email({ tlds: { allow: ['com'] } }).required().messages(stringMessage("Email")),
            employee: joi.number().messages(numMessage("Employee")),
            default_module: joi.number().messages(numMessage("DefaultModule")),
            user_level: joi.any().valid('Admin', 'Employee', 'Manager', 'Other'),
            user_roles: joi.array().items(joi.number()).allow(null).messages(numMessage("UserRoles")),
            last_login: joi.date().messages(dateMessage("LastLogin")),
            last_update: joi.date().messages(dateMessage("LastUpdate")),
            created: joi.date().messages(dateMessage("CreatedOn")),
            login_hash: joi.string().max(64).messages(stringMessage("LoginHash")),
            lang: joi.number().messages(numMessage("Language"))
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
            username: joi.string().regex(/^[A-Za-z0-9_.]{4,100}$/).messages(stringMessage("UserName")),
            email: joi.string().email({ tlds: { allow: ['com'] } }).required().messages(stringMessage("Email")),
            employee: joi.number().messages(numMessage("Employee")),
            default_module: joi.number().messages(numMessage("DefaultModule")),
            user_level: joi.string().valid('Admin', 'Employee', 'Manager', 'Other').messages(stringMessage("UserLevel")),
            user_roles: joi.array().items(joi.number()).allow(null).messages(numMessage("UserRoles")),
            last_login: joi.date().messages(dateMessage("LastLogin")),
            last_update: joi.date().messages(dateMessage("LastUpdate")),
            created: joi.date().messages(dateMessage("CreatedOn")),
            login_hash: joi.string().max(64).messages(stringMessage("LoginHash")),
            lang: joi.number().messages(numMessage("Language"))
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
            id: joi.number().messages(numMessage("Id")),
            email: joi.string().email().messages(stringMessage("Id"))
        })
    }
}



//regex( /^[a-zA-Z\s]{5,100}$/)
