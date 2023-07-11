const Joi = require('joi')

module.exports = {
    create: {
        body: Joi.object({
            type: Joi.string().required().min(1).max(100).label('Type').messages({
                "string.base": `"Type" should be a type of string`,

                "string.min": `"Type" must contain minimum of 1 characters`,

                "string.max": `"Type" must contain maximum of 100 characters`,

                "any.required": `"Type" is a required field`
            }),
            element: Joi.number().required().messages({
                "number.base": `"Element" should be a type of string`,

                "any.required": `"Element" is a required field`
            }),
            approver: Joi.number().label('Approver').messages({
                "number.base": `"Approver" should be a type of string`,
            }),
            level: Joi.number().label('Level').messages({
                "number.base": `"Level" should be a type of string`,
            }),
            status: Joi.number().label('Status').messages({
                "number.base": `"Status" should be a type of string`,
            }),
            active: Joi.number().messages({
                "number.base": `"Active" should be a type of string`,
            }),
            created: Joi.date().messages({
                "date.base":`"Created" should be a type of date`
            }),
            updated: Joi.date().messages({
                "date.base":`"Updated" should be a type of date`
            })
        })
    },

    update: {
        body: Joi.object({
            type: Joi.string().required().min(1).max(100).label('Type').messages({
                "string.base": `"Type" should be a type of string`,

                "string.min": `"Type" must contain minimum of 1 characters`,

                "string.max": `"Type" must contain maximum of 100 characters`,

                "any.required": `"Type" is a required field`
            }),
            element: Joi.number().required().messages({
                "number.base": `"Element" should be a type of string`,

                "any.required": `"Element" is a required field`
            }),
            approver: Joi.number().label('Approver').messages({
                "number.base": `"Approver" should be a type of string`,
            }),
            level: Joi.number().label('Level').messages({
                "number.base": `"Level" should be a type of string`,
            }),
            status: Joi.number().label('Status').messages({
                "number.base": `"Status" should be a type of string`,
            }),
            active: Joi.number().messages({
                "number.base": `"Active" should be a type of string`,
            }),
            created: Joi.date().messages({
                "date.base":`"Created" should be a type of date`
            }),
            updated: Joi.date().messages({
                "date.base":`"Updated" should be a type of date`
            })
        }),
        params: Joi.object({

        }),
        query: Joi.object({
            
        })
    },

    getById: {
        params: Joi.object({

        }),

        query: Joi.object({
            id: Joi.number().required()
        }),
    },

    remove: {
        params: Joi.object({

        }),

        query: Joi.object({
            id: Joi.number().required()
        })
    }
}