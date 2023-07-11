const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            name: Joi.string().max(30).regex(/^[a-zA-Z\s]{0,30}$/).required()
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" must contain maximum of 30 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            class: Joi.string().max(30).regex(/^[a-zA-Z\s]{0,30}$/).required().messages({

                "string.base": `"Class" should be a type of string`,
                "string.max": `"Class" must contain maximum of 30 characters`,
                "string.pattern.base": `"Class" must contain only alphabets`,
                "any.required": `"Class" is a required field`
            }),
            lastrun: Joi.date().allow("", null)
                .messages({ "date.base": `"lastrun" should be in "yyyy-mm-dd"` }),
            frequency: Joi.number().required().label('Frequency')
                .messages({ "number.base": `"Frequency" should be a number` }),
            time: Joi.string().required().label('Time')
                .messages({ "string.base": `"Time" should be a type of string` }),
            type: Joi.string().valid("Minutely", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"),
            status: Joi.string().valid("Enabled", "Disabled")
        }),
    },
    update: {
        body: Joi.object({
            name: Joi.string().max(30).regex(/^[a-zA-Z\s]{0,30}$/).label('Name')
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.max": `"Name" must contain maximum of 30 characters`,
                    "string.pattern.base": `"Name" must contain only alphabets`,
                    "any.required": `"Name" is a required field`
                }),
            class: Joi.string().max(30).regex(/^[a-zA-Z\s]{0,30}$/).messages({

                "string.base": `"Class" should be a type of string`,
                "string.max": `"Class" must contain maximum of 30 characters`,
                "string.pattern.base": `"Class" must contain only alphabets`,
                "any.required": `"Class" is a required field`
            }),
            lastrun: Joi.date()
                .messages({ "date.base": `"lastrun" should be in "yyyy-mm-dd"` }),
            frequency: Joi.number().label('Frequency')
                .messages({ "number.base": `"Frequency" should be a number` }),
            time: Joi.string().label('Time')
                .messages({ "string.base": `"Time" should be a type of string` }),
            type: Joi.string().valid("Minutely", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"),
            status: Joi.string().valid("Enabled", "Disabled")
        }),
        query: Joi.object({
            id: Joi.number().required()
        }),
    },
    delete: {
        body: Joi.object({

        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()

        }),
    },
    getById: {
        params: Joi.object({


        }),
        query: Joi.object({
            id: Joi.number().required()

        }),
    },

}