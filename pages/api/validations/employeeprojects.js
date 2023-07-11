const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number()
                .required()
                .label('Employee')
                .messages({
                    "number.base": `"Employee" should be a type of number`,
                    "any.required": `"Employee" is required field`
                }),
            project: Joi.number()
                .required()
                .label('project')
                .messages({
                    "number.base": `"Project" should be a type of number`,
                    "any.required": `"Project" is required field`
                }),
            date_start: Joi.date()
                .required()
                .label('date_start')
                .messages({ "date.base": `"date_start" should be in valid date format(yyyy:mm:dd)` }),
            date_end: Joi.date()
                .label('date_end')
                .messages({ "date.base": `"date_end" should be in valid date format(yyyy:mm:dd)` }),
            status: Joi.string()
                .valid('Current', 'Inactive', 'completed'),
            details: Joi.string(),
            bill_type: Joi.string()
                .valid('Billable', 'Non Billable'),
            bill_percent: Joi.number()
                .label('Bill Percent')
                .messages({
                    "number.base": `"Bill Percent" should be decimal`,
                    "any.required": `"Bill Percent" is required field`
                }),
            comments: Joi.string()

        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            //
        })
    },

    update: {
        body: Joi.object({
            employee: Joi.number()
                .label('Employee')
                .messages({
                    "number.base": `"Employee" should be a type of number`,
                    "any.required": `"Employee" is required field`
                }),
            project: Joi.number()
                .label('project')
                .messages({
                    "number.base": `"Project" should be a type of number`,
                    "any.required": `"Project" is required field`
                }),
            date_start: Joi.date()
                .label('date_start')
                .messages({ "date.base": `"Dob" should be in valid date format(yyyy:mm:dd)` }),
            date_end: Joi.date()
                .label('date_end')
                .messages({ "date.base": `"Dob" should be in valid date format(yyyy:mm:dd)` }),
            status: Joi.string()
                .valid('Current', 'Inactive', 'completed'),
            details: Joi.string(),
            bill_type: Joi.string()
                .valid('Billable', 'Non Billable'),
            bill_percent: Joi.number()
                .label('Bill Percent')
                .messages({
                    "number.base": `"Bill Percent" should be decimal`,
                    "any.required": `"Bill Percent" is required field`
                }),
            comments: Joi.string()

        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    delete: {
        body: Joi.object({

        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()

        })
    },

    getById: {
        params: Joi.object({
            //
        }),

        query: Joi.object({
            id: Joi.number().required()
        })
    }

};




