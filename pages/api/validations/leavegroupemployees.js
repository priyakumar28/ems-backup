const Joi = require('joi');
module.exports = {
    // POST /leavegroupemployees/create
    create: {
        body: Joi.object({

            employee: Joi.number()
                         .required()
                         .label('employee')
                         .messages({
                             "number.base":"This field must be a number",
                             "any.required":"This field is required"
                         }),

            leave_group: Joi.number()
                            .required()
                            .label('leave_group')
                            .messages({
                                "number.base":"This field must be a number",
                                "any.required":"This field is required"
                            }),

            created: Joi.date()
                        .label('created')
                        .messages({
                            "date.base":"This field must be a date"
                        }),

            updated: Joi.date()
                        .label('updated')
                        .messages({
                            "date.base":"This field must be a date"
                        })

        }),
        
    },
//update existing leave type and validations for body
    update: {
        body: Joi.object({

            employee: Joi.number()
                         .required()
                         .label('employee')
                         .messages({
                             "number.base":"This field must be a number",
                             "any.required":"This field is required"
                         }),

            leave_group: Joi.number()
                            .required()
                            .label('leave_group')
                            .messages({
                                "number.base":"This field must be a number",
                                "any.required":"This field is required"
                            }),

            created: Joi.date()
                        .label('created')
                        .messages({
                            "date.base":"This field must be a date"
                        }),

            updated: Joi.date()
                        .label('updated')
                        .messages({
                            "date.base":"This field must be a date"
                        })

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
