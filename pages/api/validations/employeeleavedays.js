const Joi = require('joi');
module.exports = {
    // POST /employeeleavedays/create
    create: {
        body: Joi.object({
            employee_leave: Joi.number()
                               .required()
                               .label('employee_leave')
                               .message({
                                   "number.base":"This field has to be a number",
                                   "any.required":"This field is required"
                               }),
            leave_date: Joi.date()
                           .label('leave_date')
                           .messages({
                               "date.base":"This field has to be a date"
                           }),

            leave_type: Joi.string()
                           .valid("Full Day","Half Day - Morning","Half Day - Afternoon","1 Hour - Morning","2 Hours - Morning","3 Hours - Morning","1 Hour - Afternoon","2 Hours - Afternoon","3 Hours - Afternoon")
                           .required()
                           .label('leave_type')
                           .messages({
                               "string.base":"This field has to be a string",
                               "string.valid":`Choose from "Full Day","Half Day - Morning","Half Day - Afternoon","1 Hour - Morning","2 Hours - Morning","3 Hours - Morning","1 Hour - Afternoon","2 Hours - Afternoon","3 Hours - Afternoon"`,
                               "string.required":"This field is required",
                           })

        }),
        query: Joi.object({
            // 
        })
    },
//update existing employee leave days and validations for body
    update: {
        
        body: Joi.object({
            employee_leave: Joi.number()
                               .required()
                               .label('employee_leave')
                               .message({
                                   "number.base":"This field has to be a number",
                                   "any.required":"This field is required"
                               }),
            leave_date: Joi.date()
                           .label('leave_date')
                           .messages({
                               "date.base":"This field has to be a date"
                           }),

            leave_type: Joi.string()
                           .valid("Full Day","Half Day - Morning","Half Day - Afternoon","1 Hour - Morning","2 Hours - Morning","3 Hours - Morning","1 Hour - Afternoon","2 Hours - Afternoon","3 Hours - Afternoon")
                           .required()
                           .label('leave_type')
                           .messages({
                               "string.base":"This field has to be a string",
                               "string.valid":`Choose from "Full Day","Half Day - Morning","Half Day - Afternoon","1 Hour - Morning","2 Hours - Morning","3 Hours - Morning","1 Hour - Afternoon","2 Hours - Afternoon","3 Hours - Afternoon"`,
                               "string.required":"This field is required",
                           })

        }),

         query: Joi.object({
             id: Joi.required().messages({
                 "any.required":"Here query is required"
             }),
         }),
       
    },
    getById : {
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        })
    },
    delete : {
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        })
    },



};
