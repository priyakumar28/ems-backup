const Joi = require('joi');

module.exports ={
    create: {
        body: Joi.object({
            name: Joi.string()
                     .required()
                     .label('name')
                     .messages({
                         "string.base":"This field must be a string",
                         "any.required":"This field is required",
                     }),

            details: Joi.string()
                        .label('details')
                        .messages({
                            "string.base":"This field must be a string"
                        }),

            required: Joi.string()
                         .valid("Yes","No")
                         .messages({
                             "string.base":"This field must be a string",
                             "string.valid":`Choose wether "Yes" or "No"`
                         }),
                         
            alert_on_missing: Joi.string()
                                 .valid("Yes","No")
                                 .label('alert_on_missing')
                                 .messages({
                                     "string.base":"This field must be a string",
                                     "string.valid":`Choose between "Yes" and "No"`
                                 }),

            alert_before_expiry: Joi.string()
                                    .valid("Yes","No")
                                    .label('alert_before_expiry')
                                    .messages({
                                        "string.base":"This field must be a string", 
                                        "string.valid":`Choose wether "Yes" or "No"`,
                                    }),

            alert_before_day_number: Joi.number()
                                        .required()
                                        .label('alert_before_day_number')
                                        .messages({
                                            "number.base":"This field must be a number",
                                            "any.required":"This field is required"
                                        }),

            created: Joi.date()
                        .label('created')
                        .messages({
                            "date.base":"This field must be of a date format",
                        }),

            updated: Joi.date()
                        .label('updated')
                        .messages({
                            "date.base":"This field must be of a date format",
                        }),
        })
    },
    update: {
        body: Joi.object({
            name: Joi.string()
                     .required()
                     .label('name')
                     .messages({
                         "string.base":"This field must be a string",
                         "any.required":"This field is required",
                     }),

            details: Joi.string()
                        .label('details')
                        .messages({
                            "string.base":"This field must be a string"
                        }),

            required: Joi.string()
                         .valid("Yes","No")
                         .messages({
                             "string.base":"This field must be a string",
                             "string.valid":`Choose wether "Yes" or "No"`
                         }),
                         
            alert_on_missing: Joi.string()
                                 .valid("Yes","No")
                                 .label('alert_on_missing')
                                 .messages({
                                     "string.base":"This field must be a string",
                                     "string.valid":`Choose between "Yes" and "No"`
                                 }),

            alert_before_expiry: Joi.string()
                                    .valid("Yes","No")
                                    .label('alert_before_expiry')
                                    .messages({
                                        "string.base":"This field must be a string", 
                                        "string.valid":`Choose wether "Yes" or "No"`,
                                    }),

            alert_before_day_number: Joi.number()
                                        .required()
                                        .label('alert_before_day_number')
                                        .messages({
                                            "number.base":"This field must be a number",
                                            "any.required":"This field is required"
                                        }),

            created: Joi.date()
                        .label('created')
                        .messages({
                            "date.base":"This field must be of a date format",
                        }),

            updated: Joi.date()
                        .label('updated')
                        .messages({
                            "date.base":"This field must be of a date format",
                        }),
        }),
        query: Joi.object({
            id: Joi.required()
                   .messages({
                             "any.required":"Here query is required"
                        }),
        })
    },
    getById: {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
        })
    },
    delete: {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
        })
    }

}