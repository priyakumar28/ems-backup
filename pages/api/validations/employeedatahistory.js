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
            employee_id: Joi.number().required().messages({
                "number.base": `"Employee_id" should be a type of number`,

                "any.required": `"Employee_id" is a required field`

            }),
            field: Joi.string().required().min(1).max(100).messages({
                "string.base": `"Filed" should be a type of string`,

                "string.min": `"Filed" must contain minimum of 1 characters`,

                "string.max": `"Filed" must contain maximum of 100 characters`,

                "any.required": `"Filed" is a required field`
            }),
            old_value: Joi.string().min(1).max(500).messages({
                "string.base": `"Old_value" should be a type of string`,

                "string.min": `"Old_value" must contain minimum of 1 characters`,

                "string.max": `"Old_value" must contain maximum of 500 characters`,
            }),
            new_value: Joi.string().min(1).max(500).messages({
                "string.base": `"New_value" should be a type of string`,

                "string.min": `"New_value" must contain minimum of 1 characters`,

                "string.max": `"New_value" must contain maximum of 500 characters`,
            }),
            description: Joi.string().min(1).max(800).messages({
                "string.base": `"Description" should be a type of string`,

                "string.min": `"Description" must contain minimum of 1 characters`,

                "string.max": `"Description" must contain maximum of 800 characters`,
            }),
            user_id: Joi.number().messages({
                "number.base": `"User_id" should be a type of number`
            }),
            updated: Joi.date().messages({
                "date.base":`"Updated" should be a type of date`
            }),
            created: Joi.date().messages({
                "date.base":`"Created" should be a type of date`
            })
        }),

        params: Joi.object({

        }),
        query: Joi.object({
            
        }),
    },

    update: {
        body: Joi.object({
            type: Joi.string().required().min(1).max(100).label('Type').messages({
                "string.base": `"Type" should be a type of string`,

                "string.min": `"Type" must contain minimum of 1 characters`,

                "string.max": `"Type" must contain maximum of 100 characters`,

                "any.required": `"Type" is a required field`
            }),
            employee_id: Joi.number().required().messages({
                "number.base": `"Employee_id" should be a type of number`,

                "any.required": `"Employee_id" is a required field`

            }),
            field: Joi.string().required().min(1).max(100).messages({
                "string.base": `"Filed" should be a type of string`,

                "string.min": `"Filed" must contain minimum of 1 characters`,

                "string.max": `"Filed" must contain maximum of 100 characters`,

                "any.required": `"Filed" is a required field`
            }),
            old_value: Joi.string().min(1).max(500).messages({
                "string.base": `"Old_value" should be a type of string`,

                "string.min": `"Old_value" must contain minimum of 1 characters`,

                "string.max": `"Old_value" must contain maximum of 500 characters`,
            }),
            new_value: Joi.string().min(1).max(500).messages({
                "string.base": `"New_value" should be a type of string`,

                "string.min": `"New_value" must contain minimum of 1 characters`,

                "string.max": `"New_value" must contain maximum of 500 characters`,
            }),
            description: Joi.string().min(1).max(800).messages({
                "string.base": `"Description" should be a type of string`,

                "string.min": `"Description" must contain minimum of 1 characters`,

                "string.max": `"Description" must contain maximum of 800 characters`,
            }),
            user_id: Joi.number().messages({
                "number.base": `"User_id" should be a type of number`
            }),
            updated: Joi.date().messages({
                "date.base":`"Updated" should be a type of date`
            }),
            created: Joi.date().messages({
                "date.base":`"Created" should be a type of date`
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
        }) 
    },

    remove: {
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    }

}