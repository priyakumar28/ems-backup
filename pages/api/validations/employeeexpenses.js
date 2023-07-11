const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number().required(),
            expense_date: Joi.date(),
            payment_method: Joi.number(),
            transaction_no: Joi.string().min(3).regex(/^[a-zA-Z0-9\s]{1,128}$/).messages({
                "string.base": `"transaction_no" should be a type of string`,
                "string.min": `"transaction_no" must contain minimum of 3 characters`,
                "string.pattern.base": `"transaction_no" not allows special symbols`,
                "any.required": `"transaction_no" is a required field`
            }),
            payee: Joi.string().regex(/^[a-zA-Z0-9\s]{1,128}$/).messages({
                "string.base": `"payee" should be a type of string`,
                "string.min": `"payee" must contain minimum of 3 characters`,
                "string.pattern.base": `"payee" not allows special symbols`,
                "any.required": `"payee" is a required field`
            }),
            category: Joi.number().required(),
            notes: Joi.string(),
            amount: Joi.number(),
            currency: Joi.number(),
            attachment1: Joi.string(),
            attachment2: Joi.string(),
            attachment3: Joi.string(),
            created: Joi.date(),
            updated: Joi.date(),
            status: Joi.string().valid("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing")
        })
    },

    update: {
        body: Joi.object({
            employee: Joi.number(),
            expense_date: Joi.date(),
            payment_method: Joi.number(),
            transaction_no: Joi.string().min().regex(/^[a-zA-Z0-9\s]{1,128}$/).messages({
                "string.base": `"transaction_no" should be a type of string`,
                "string.min": `"transaction_no" must contain minimum of 3 characters`,
                "string.pattern.base": `"transaction_no" not allows special symbols`,
                "any.required": `"transaction_no" is a required field`
            }),
            payee: Joi.string().regex(/^[a-zA-Z0-9\s]{1,128}$/).messages({
                "string.base": `"payee" should be a type of string`,
                "string.min": `"payee" must contain minimum of 3 characters`,
                "string.pattern.base": `"payee" not allows special symbols`,
                "any.required": `"payee" is a required field`
            }),
            category: Joi.number(),
            notes: Joi.string(),
            amount: Joi.number(),
            currency: Joi.number(),
            attachment1: Joi.string(),
            attachment2: Joi.string(),
            attachment3: Joi.string(),
            created: Joi.date(),
            updated: Joi.date(),
            status: Joi.string().valid("Approved", "Pending", "Rejected", "Cancellation Requested", "Cancelled", "Processing")
        })
    },
    getById: {
        query: Joi.object({
            id: Joi.number().required()
        }),
    },

    delete: {
        query: Joi.object({
            id: Joi.number().required()
        }),
    }

}