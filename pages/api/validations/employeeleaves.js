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
            employee:joi.number().required().messages(numMessage('Employee')),
            leave_type:joi.number().required().messages(numMessage('typeofleave')),
            leave_period: joi.number().required().messages(numMessage('LeavePeriod')),
            date_start: joi.date().messages(dateMessage('StartingDate')),
            date_end:joi.date().messages(dateMessage('EndingDate')),
            details:joi.string().messages(stringMessage('Details')),
            status:joi.string().valid('Approved','Pending','Rejected','Cancellation Requested','Cancelled','Processing').messages(stringMessage('Status')),
            attachment:joi.string().messages(stringMessage('Attachment'))
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
            employee:joi.number().required().messages(numMessage('Employee')),
            leave_type:joi.number().required().messages(numMessage('typeofleave')),
            leave_period: joi.number().required().messages(numMessage('LeavePeriod')),
            date_start: joi.date().messages(dateMessage('StartingDate')),
            date_end:joi.date().messages(dateMessage('EndingDate')),
            details:joi.string().messages(stringMessage('Details')),
            status:joi.string().valid('Approved','Pending','Rejected','Cancellation Requested','Cancelled','Processing').messages(stringMessage('Status')),
            attachment:joi.string().messages(stringMessage('Attachment'))
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