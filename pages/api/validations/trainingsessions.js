const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            name: Joi.string().min(3).max(32).label('Name').required()
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.min":`"Name" should contain minimum 3 characters`,
                    "string.max": `"Name" allowed maximum of 30 characters`,
                    "any.required": `"Name" is a required field`
                }),
            course: Joi.number().label('Course').required()
                .messages({
                    "number.base": `"Course" should be a type of number`,
                    "any.required": `"Course" is required field`
                }),
            description: Joi.string().allow(null).max(400).label('Description'),
            scheduled: Joi.date().allow(null).label('Scheduled date')
                .messages({ "date.base": `"Scheduled date" should be valid date` }),
            duedate: Joi.date().allow(null).min(Joi.ref('scheduled')).label('Due date')
                .messages({ "date.base": `"Due date" should be valid date` }),
            deliverymethod: Joi.string().valid('Classroom', 'Self Study', 'Online').label('Session method'),
            deliverylocation: Joi.string().allow(null).max(400).label('Session location'),
            status: Joi.string().valid('Pending', 'Approved', 'Completed', 'Cancelled').label('Status'),
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
            name: Joi.string().min(3).max(32).label('Name').required()
                .messages({
                    "string.base": `"Name" should be a type of string`,
                    "string.min": `"Name" should contain minimum 3 characters`,
                    "string.max": `"Name" allowed maximum of 30 characters`,
                    "any.required": `"Name" is a required field`
                }),
            course: Joi.number().label('Course').required()
                .messages({
                    "number.base": `"Course" should be a type of number`,
                    "any.required": `"Course" is required field`
                }),
            description: Joi.string().allow(null).max(400).label('Description'),
            scheduled: Joi.date().allow(null).label('Scheduled date')
                .messages({ "date.base": `"Scheduled date" should be valid date` }),
            duedate: Joi.date().allow(null).min(Joi.ref('scheduled')).label('Due date')
                .messages({ "date.base": `"Due date" should be valid date` }),
            deliverymethod: Joi.string().valid('Classroom', 'Self Study', 'Online').label('Session method'),
            deliverylocation: Joi.string().allow(null).max(400).label('Session location'),
            status: Joi.string().valid('Pending', 'Approved', 'Completed', 'Cancelled').label('Status'),
        }),
        params: Joi.object({
            //
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    delete: {
        params: Joi.object({
            //
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