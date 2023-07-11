const Joi = require('joi');

module.exports = {
    // POST /v1/employees/create
    create: {
        body: Joi.object({
            employee: Joi.number().required().messages({
                "number.base": "Invalid employee id",
                "any.required": "Employee is required"
            }).label('employee'),
            trainingsession: Joi.number().messages({
                "number.base": "Invalid training session given"
            }).label('Training session'),
            feedback: Joi.string().allow(null).min(5).max(1500).label('Feedback'),
            status: Joi.string().valid("Scheduled", "Attended", "Not-Attended", "Completed").messages({
                "string.base": "Status is invalid",
            }).label('status')
        }),
        query: Joi.object({ 

        })
    },

    getById: {
        params: Joi.object({ 
            id:Joi.number().required()
        }),
        query: Joi.object({ 
            id: Joi.number().required()
        })
    },

    remove: {
        params: Joi.object({ 
            id: Joi.number().required()
        }),
        query: Joi.object({

        })
    },

    update: {
        body: Joi.object({
            employee: Joi.number().required().messages({
                "number.base": "Invalid employee id",
                "any.required": "Employee is required"
            }).label('employee'),
            trainingsession: Joi.number().messages({
                "number.base": "Invalid training session given"
            }).label('Training session'),
            feedback: Joi.string().allow(null).min(5).max(1500).label('Feedback'),
            status: Joi.string().valid("Scheduled", "Attended", "Not-Attended", "Completed").messages({
                "string.base": "Status is invalid",
            }).label('status')
        }),
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        }),
    }
};
