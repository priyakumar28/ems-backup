const Joi = require('joi');
module.exports = {
    // POST /leavetypes/create
    create: {
        body: Joi.object({

           leave_type: Joi.number()
                          .required()
                          .label('leave_type')
                          .messages({
                              "number.base":"This field must be a number",
                              "any.required":"This field is required"
                          }),
           
            employee: Joi.number()
                         .label('employee'),

            leave_period: Joi.number()
                             .required()
                             .label('leave_period'),

            amount: Joi.number()
                       .required()
                       .label('amount'),

            note: Joi.string()
                     .label('note'),

            created : Joi.date()
                         .label('created'),

            updated : Joi.date()
                         .label('updated'),


            
        }),
    },
//update existing leave type and validations for body
    update: {
        body: Joi.object({

            leave_type: Joi.number()
                           .required()
                           .label('leave_type'),
            
             employee: Joi.number()
                          .label('employee'),
 
             leave_period: Joi.number()
                              .required()
                              .label('leave_period'),
 
             amount: Joi.number()
                        .required()
                        .label('amount'),
 
             note: Joi.string()
                      .label('note'),
 
             created : Joi.date()
                          .label('created'),
 
             updated : Joi.date()
                          .label('updated'),
 
 
             
         }),
         query: Joi.object({
             id: Joi.required()
         }),
       
    },

    getById: {
        query: Joi.object({
            id: Joi.required()
        })
    },

    delete:{
        query: Joi.object({
            id: Joi.required()
        })
    }

};
