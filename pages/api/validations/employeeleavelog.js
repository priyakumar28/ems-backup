const joi = require('joi');

const stringMessage = (fieldName, min=null,max=null,pat=null) => {
    return {
       "string.base": fieldName + "should be a type of string",
       "string.empty": fieldName + " cannot be an empty field",
       "string.min": fieldName + " should have a minimum length of " + min,
       "string.max": fieldName + " should have a maximum length of " + max,
       "string.pattern.base": fieldName + " must contain only" + pat,
       "string.alphanum": fieldName + " must contain only alphabets and numbers",
       "any.valid": fieldName + " contains invalid values",
       "string.email": fieldName + " must be a valid one",
       "any.required": fieldName + " is a required field"
    }
 };
 const numMessage = (fieldName) => {
    return {
       "number.base": fieldName + " should be a type of number",
       "any.required": fieldName + " is a required field"
    }
 };
 const dateMessage = (fieldName) => {
    return {
       "date.base": fieldName + " should be a type of date",
       "any.required": fieldName + " is a required field"
    }
 };

module.exports =    {
    create:{
        body: joi.object({
            employee_leave:joi.number().required().messages(numMessage('EmployeeLeaveid')),
            user_id:joi.number().messages(numMessage('Userid')),
            data: joi.string().required().max(500).messages(stringMessage('Data')),
            status_from: joi.string().valid('Approved','Pending','Rejected','Cancellation Requested','Cancelled','Processing').messages(stringMessage('FromStatus')),
            status_to:joi.string().valid('Approved','Pending','Rejected','Cancellation Requested','Cancelled','Processing').messages(stringMessage('ToStatus')),
            created:joi.date().messages(dateMessage('createdon'))
        }),
        params: joi.object({
            //
        }),
        query: joi.object ({
            //
        })
    },
    update:{
        body: joi.object({
            employee_leave:joi.number().required().messages(numMessage('EmployeeLeaveid')),
            user_id:joi.number().messages(numMessage('Userid')),
            data: joi.string().required().max(500).messages(stringMessage('Data')),
            status_from: joi.string().valid('Approved','Pending','Rejected','Cancellation Requested','Cancelled','Processing').messages(stringMessage('FromStatus')),
            status_to:joi.string().valid('Approved','Pending','Rejected','Cancellation Requested','Cancelled','Processing').messages(stringMessage('ToStatus')),
            created:joi.date().messages(dateMessage('createdon'))
        }),
        params: joi.object({
           //
        }),
        query: joi.object ({
            id:joi.number().required().messages(numMessage('Id'))
        })
    },
    remove:{
        params: joi.object({
            //
        }),
        query: joi.object ({
            id:joi.number().required().messages(numMessage('Id'))
        })
    },
    getById:{

        params: joi.object({
            //
        }),
        query: joi.object ({
            id:joi.number().required().messages(numMessage('Id'))
        })
    }
}