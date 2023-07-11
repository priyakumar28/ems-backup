const Joi = require('joi');

module.exports = {
    // POST /leavetypes/create
    create: {
        body: Joi.object({

            name: Joi.string()
                     .required()
                     .min(3)
                     .max(100)
                     .label('Name')
                     .messages({
                         "string.base": "Name must be a string",
                         "any.required":"This field cannot be empty",
                         "string.min": "Name must be greater than or equal to 3 Characters!!!!!",
                         "string.max": "Name must be less than or equal to 100 characters"
                     }),

            supervisor_leave_assign: Joi.string()
                                        .valid("Yes","No")
                                        .default("Yes")
                                        .label('supervisor_leave_assign')
                                        .messages({
                                            "string.base":"This field must be a string",
                                            "string.valid":"It's either a 'Yes' or a 'No'",
                                        }),

            employee_can_apply: Joi.string()
                                   .valid("Yes","No")
                                   .default("Yes")
                                   .label('employee_can_apply')
                                   .messages({
                                       "string.base":"This field must be a string",
                                       "valid.base":"It's either a 'Yes' or a 'No'"
                                   }),

            apply_beyond_current: Joi.string()
                                     .valid("Yes","No")
                                     .default("Yes")
                                     .label('apply_beyond_current')
                                     .messages({
                                         "string.base":"This field must be a string",
                                         "valid.base":"It's either a 'Yes' or a 'No'",

                                     }),

            leave_accrue: Joi.string()
                             .valid("Yes","No")
                             .default("No")
                             .label('leave_accrue')
                             .messages({
                                 "string.base":"This field must be a string",
                                 "valid.base":"It's either a 'Yes' or a 'No'"
                             }),

            carried_forward: Joi.string()
                                .valid("Yes","No")
                                .default("No")
                                .label('carried_forward')
                                .messages({
                                    "string.base":"This field must be a string",
                                    "valid.base":"It's either a 'Yes' or a 'No'"
                                }),

            default_per_year: Joi.number()
                                 .required()
                                 .label('default_per_year')
                                 .messages({
                                     "number.base":"This field must be a number",
                                     "any.required":"This field cannot be left empty"

                                 }),

            carried_forward_percentage: Joi.number()
                                           .default(0)
                                           .label('carried_forward_percentage')
                                           .messages({
                                               "number.base":"This field must be a number",
                                           }),

            carried_forward_leave_availability: Joi.number()
                                                   .default(365)
                                                   .label('carried_forward_leave_availability')
                                                   .messages({
                                                       "number.base":"This field must be a number"
                                                   }),

            propotionate_on_joined_date: Joi.string()
                                            .valid("Yes","No")
                                            .default("No")
                                            .label('propotionate_on_joined_date')
                                            .messages({
                                                "string.base":"This field must be a string",
                                                "valid.base":"It's either a 'Yes' or a 'No'"
                                            }),

            send_notification_emails: Joi.string()
                                         .valid("Yes","No")
                                         .default("Yes")
                                         .label('send_notification_emails')
                                         .messages({
                                             "string.base":"This field must be a string",
                                             "valid.base":"It's either a 'Yes' or a 'No'"
                                         }),
            leave_group: Joi.number()
                            .required()
                            .label('leave_group')
                            .messages({
                                "number.base": "This field must be a number",
                                "any.required": "This field cannot be empty"
                            }),

            leave_color:  Joi.string()
                             .max(10)
                             .required()
                             .label('leave_color')
                             .messages({
                                 "string.base": "This field must be a string",
                                 "any.required":"This field cannot be empty",
                                 "string.max": "This field must be less than or equal to 10 characters"
                             }),

            max_carried_forward_amount: Joi.number()
                                           .default(0)
                                           .label('max_carried_forward_amount')
                                           .messages({
                                               "number.base": "This field must be a number",


                                           }),
            
        }),
      
    },
//update existing leave type and validations for body
    update: {
        body: Joi.object({

            name: Joi.string()
                     .required()
                     .min(3)
                     .max(100)
                     .label('Name')
                     .messages({
                         "string.base": "Name must be a string",
                         "any.required":"This field cannot be empty",
                         "string.min": "Name must be greater than or equal to 3 Characters!!!!!",
                         "string.max": "Name must be less than or equal to 100 characters"
                     }),

            supervisor_leave_assign: Joi.string()
                                        .valid("Yes","No")
                                        .default("Yes")
                                        .label('supervisor_leave_assign')
                                        .messages({
                                            "string.base":"This field must be a string",
                                            "string.valid":"It's either a 'Yes' or a 'No'",
                                        }),

            employee_can_apply: Joi.string()
                                   .valid("Yes","No")
                                   .default("Yes")
                                   .label('employee_can_apply')
                                   .messages({
                                       "string.base":"This field must be a string",
                                       "valid.base":"It's either a 'Yes' or a 'No'"
                                   }),

            apply_beyond_current: Joi.string()
                                     .valid("Yes","No")
                                     .default("Yes")
                                     .label('apply_beyond_current')
                                     .messages({
                                         "string.base":"This field must be a string",
                                         "valid.base":"It's either a 'Yes' or a 'No'",

                                     }),

            leave_accrue: Joi.string()
                             .valid("Yes","No")
                             .default("No")
                             .label('leave_accrue')
                             .messages({
                                 "string.base":"This field must be a string",
                                 "valid.base":"It's either a 'Yes' or a 'No'"
                             }),

            carried_forward: Joi.string()
                                .valid("Yes","No")
                                .default("No")
                                .label('carried_forward')
                                .messages({
                                    "string.base":"This field must be a string",
                                    "valid.base":"It's either a 'Yes' or a 'No'"
                                }),

            default_per_year: Joi.number()
                                 .required()
                                 .label('default_per_year')
                                 .messages({
                                     "number.base":"This field must be a number",
                                     "any.required":"This field cannot be left empty"

                                 }),

            carried_forward_percentage: Joi.number()
                                           .default(0)
                                           .label('carried_forward_percentage')
                                           .messages({
                                               "number.base":"This field must be a number",
                                           }),

            carried_forward_leave_availability: Joi.number()
                                                   .default(365)
                                                   .label('carried_forward_leave_availability')
                                                   .messages({
                                                       "number.base":"This field must be a number"
                                                   }),

            propotionate_on_joined_date: Joi.string()
                                            .valid("Yes","No")
                                            .default("No")
                                            .label('propotionate_on_joined_date')
                                            .messages({
                                                "string.base":"This field must be a string",
                                                "valid.base":"It's either a 'Yes' or a 'No'"
                                            }),

            send_notification_emails: Joi.string()
                                         .valid("Yes","No")
                                         .default("Yes")
                                         .label('send_notification_emails')
                                         .messages({
                                             "string.base":"This field must be a string",
                                             "valid.base":"It's either a 'Yes' or a 'No'"
                                         }),
            leave_group: Joi.number()
                            .required()
                            .label('leave_group')
                            .messages({
                                "number.base": "This field must be a number",
                                "any.required": "This field cannot be empty"
                            }),

            leave_color:  Joi.string()
                             .max(10)
                             .required()
                             .label('leave_color')
                             .messages({
                                 "string.base": "This field must be a string",
                                 "any.required":"This field cannot be empty",
                                 "string.max": "This field must be less than or equal to 10 characters"
                             }),

            max_carried_forward_amount: Joi.number()
                                           .default(0)
                                           .label('max_carried_forward_amount')
                                           .messages({
                                               "number.base": "This field must be a number",


                                           }),
            
        }),
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
            
        }),
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

};
