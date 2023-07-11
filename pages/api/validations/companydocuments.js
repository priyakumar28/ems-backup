const Joi = require("joi");

module.exports = {

    create: {
        
        body : Joi.object({
            name: Joi.string()
                     .required()
                     .max(100)
                     .label('name')
                     .messages({
                         "string.base":"This field must be a string",
                         "any.required":"This field cannot be empty",
                         "string.max":"This field can hold a max of 100 characters",
                     }),

            details: Joi.string()
                        .label('details')
                        .messages({
                            "string.base":"This field must be a string"
                        }),

            valid_until: Joi.date()
                            .label('valid_until')
                            .messages({
                                "date.base":"This field must be of a date format"
                            }),

            status: Joi.string()
                       .valid("Active","Inactive","Draft")
                       .default("Active")
                       .label('status')
                       .messages({
                           "string.base":"This field must be a string",
                           "string.valid":`Choose between "Active","Inactive" and "Draft"` 
                       }),

            notify_employees: Joi.string()
                                 .valid("Yes","No")
                                 .default("Yes")
                                 .label('notify_employees')
                                 .messages({
                                     "string.base":"This field must be a string",
                                     "string.valid":`Choose either "Yes","No"`
                                 }),
                    
            attatchmemt: Joi.string()
                            .max(100)
                            .label('attatchmemt')
                            .messages({
                                "string.base":"This field must be a string",
                                "string.max":"This field can have a max of 100 characters"
                            }),

            share_departments: Joi.string()
                                  .max(100)
                                  .label('share_departments')
                                  .messages({
                                      "string.base":"This field must be a string",
                                      "string.max":"This field can have a max of 100 characters"
                                  }),

            share_employees:   Joi.string()
                                  .max(100)
                                  .label('share_employees')
                                  .messages({
                                      "stirng.base":"This field must be a string",
                                      "string.max":"This field can have a max of 100 characters"
                                  }),

        }),
    },
    update: {

        body : Joi.object({
            name: Joi.string()
                     .required()
                     .max(100)
                     .label('name')
                     .messages({
                         "string.base":"This field must be a string",
                         "any.required":"This field cannot be empty",
                         "string.max":"This field can hold a max of 100 characters",
                     }),

            details: Joi.string()
                        .label('details')
                        .messages({
                            "string.base":"This field must be a string"
                        }),

            valid_until: Joi.date()
                            .label('valid_until')
                            .messages({
                                "date.base":"This field must be of a date format"
                            }),

            status: Joi.string()
                       .valid("Active","Inactive","Draft")
                       .default("Active")
                       .label('status')
                       .messages({
                           "string.base":"This field must be a string",
                           "string.valid":`Choose between "Active","Inactive" and "Draft"` 
                       }),

            notify_employees: Joi.string()
                                 .valid("Yes","No")
                                 .default("Yes")
                                 .label('notify_employees')
                                 .messages({
                                     "string.base":"This field must be a string",
                                     "string.valid":`Choose either "Yes","No"`
                                 }),
                    
            attatchmemt: Joi.string()
                            .max(100)
                            .label('attatchmemt')
                            .messages({
                                "string.base":"This field must be a string",
                                "string.max":"This field can have a max of 100 characters"
                            }),

            share_departments: Joi.string()
                                  .max(100)
                                  .label('share_departments')
                                  .messages({
                                      "string.base":"This field must be a string",
                                      "string.max":"This field can have a max of 100 characters"
                                  }),

            share_employees:   Joi.string()
                                  .max(100)
                                  .label('share_employees')
                                  .messages({
                                      "stirng.base":"This field must be a string",
                                      "string.max":"This field can have a max of 100 characters"
                                  }),

        }),
        query: Joi.object({
            id: Joi.required().messages({
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
        }),
    },
    delete: {
        query: Joi.object({
            id: Joi.required()
                   .messages({
                       "any.required":"Here query is required"
                   })
        }),
    }   
 }

