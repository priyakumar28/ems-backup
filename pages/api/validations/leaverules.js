const Joi = require('joi');
module.exports = {
    // POST /leavetypes/create
    create: {
        body: Joi.object({

           leave_type: Joi.number()
                          .required()
                          .label('leave_type')
                          .messages({
                              "number.base":"This field must be a number"
                          }),

            job_title: Joi.number()
                          .label('job_title')
                          .messages({
                              "number.base":"This field must be a number"
                          }),

            employment_status : Joi.number()
                                   .label('employment_status')
                                   .messages({
                                       "number.base":"This field must be a number"
                                   }),

            employee: Joi.number()
                         .label('employee')
                         .messages({
                             "number.base":"This field must be a number"
                         }),

            supervisor_leave_assign: Joi.string()
                                        .valid('Yes','No')
                                        .default('Yes')
                                        .label('supervisor_leave_assign')
                                        .messages({
                                            "string.base":"This field must be a string",
                                            "string.valid":`Choose wether "Yes" or "No"`
                                        }),
            employee_can_apply: Joi.string()
                                   .valid('Yes','No')
                                   .default('Yes')
                                   .label('employee_can_apply')
                                   .messages({
                                       "string.base":"This field must be a string",
                                       "string.valid":`Choose wether "Yes" or "No"`
                                   }),

            apply_beyond_current: Joi.string()
                                     .valid('Yes','No')
                                     .default('Yes')
                                     .label('apply_beyond_current')
                                     .messages({
                                         "string.base":"This field must be a string",
                                         "string.valid":`Choose wether "Yes" or "No"`,
                                     }),

            leave_accrue: Joi.string()
                             .valid('Yes','No')
                             .default('No')
                             .messages({
                                 "string.base":"This field must be a string",
                                 "string.valid":`Choose wether "Yes" or "No"`
                             }),

            carried_forward: Joi.string()
                                .valid('Yes','No')
                                .default('No')
                                .label('carried_forward')
                                .messages({
                                    "string.base":"This field must be a string",
                                    "string.valid":`Choose wether "Yes" or "No"`
                                }),

            default_per_year: Joi.number()
                                 .required()
                                 .label('default_per_year')
                                 .messages({
                                     "number.base":"This field must be a number",
                                     "number.valid":`Choose wether "Yes" or "No"`
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
                                            .valid('Yes','No')
                                            .default('No')
                                            .label('propotionate_on_joined_date')
                                            .messages({
                                                "string.base":"This field must be a string",
                                                "string.valid":`Choose wether "Yes" or "No"`
                                            }),

            leave_group: Joi.number()
                            .label('leave_group')
                            .messages({
                                "number.base":"This field must be a number"
                            }),

            max_carried_forward_amount: Joi.number()
                                           .default(0)
                                           .label('max_carried_forward_amount')
                                           .messages({
                                               "number.base":"This field must be a number"
                                           }),

            
        }),
    },
//update existing leave type and validations for body
    update: {
        body: Joi.object({

            leave_type: Joi.number()
                           .required()
                           .label('leave_type')
                           .messages({
                               "number.base":"This field must be a number"
                           }),
 
             job_title: Joi.number()
                           .label('job_title')
                           .messages({
                               "number.base":"This field must be a number"
                           }),
 
             employment_status : Joi.number()
                                    .label('employment_status')
                                    .messages({
                                        "number.base":"This field must be a number"
                                    }),
 
             employee: Joi.number()
                          .label('employee')
                          .messages({
                              "number.base":"This field must be a number"
                          }),
 
             supervisor_leave_assign: Joi.string()
                                         .valid('Yes','No')
                                         .default('Yes')
                                         .label('supervisor_leave_assign')
                                         .messages({
                                             "string.base":"This field must be a string",
                                             "string.valid":`Choose wether "Yes" or "No"`
                                         }),
             employee_can_apply: Joi.string()
                                    .valid('Yes','No')
                                    .default('Yes')
                                    .label('employee_can_apply')
                                    .messages({
                                        "string.base":"This field must be a string",
                                        "string.valid":`Choose wether "Yes" or "No"`
                                    }),
 
             apply_beyond_current: Joi.string()
                                      .valid('Yes','No')
                                      .default('Yes')
                                      .label('apply_beyond_current')
                                      .messages({
                                          "string.base":"This field must be a string",
                                          "string.valid":`Choose wether "Yes" or "No"`,
                                      }),
 
             leave_accrue: Joi.string()
                              .valid('Yes','No')
                              .default('No')
                              .messages({
                                  "string.base":"This field must be a string",
                                  "string.valid":`Choose wether "Yes" or "No"`
                              }),
 
             carried_forward: Joi.string()
                                 .valid('Yes','No')
                                 .default('No')
                                 .label('carried_forward')
                                 .messages({
                                     "string.base":"This field must be a string",
                                     "string.valid":`Choose wether "Yes" or "No"`
                                 }),
 
             default_per_year: Joi.number()
                                  .required()
                                  .label('default_per_year')
                                  .messages({
                                      "number.base":"This field must be a number",
                                      "number.valid":`Choose wether "Yes" or "No"`
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
                                             .valid('Yes','No')
                                             .default('No')
                                             .label('propotionate_on_joined_date')
                                             .messages({
                                                 "string.base":"This field must be a string",
                                                 "string.valid":`Choose wether "Yes" or "No"`
                                             }),
 
             leave_group: Joi.number()
                             .label('leave_group')
                             .messages({
                                 "number.base":"This field must be a number"
                             }),
 
             max_carried_forward_amount: Joi.number()
                                            .default(0)
                                            .label('max_carried_forward_amount')
                                            .messages({
                                                "number.base":"This field must be a number"
                                            }),
 
             
         }),
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
            //
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
