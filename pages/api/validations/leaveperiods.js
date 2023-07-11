const joi = require('joi');

const stringMessage = (fieldName, min=null,max=null,pat=null) => {
    return {
       "string.base": fieldName + "should be a type of string",
       "string.empty": fieldName + " cannot be an empty field",
       "string.min": fieldName + " should have a minimum length of " + min,
       "string.max": fieldName + " should have a maximum length of " + max,
       "string.pattern.base": fieldName + " must contain only " + pat,
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

module.exports ={
    create:{
        body: joi.object({
            name:joi.string().required().max(100).regex( /^[a-zA-Z\s]{3,100}$/).messages(stringMessage("Name",null,100,"alphabets")),
            date_start: joi.date().messages(dateMessage("startdate")),
            date_end: joi.date().messages(dateMessage("enddate")),
            status: joi.string().valid('Active','Inactive').messages(stringMessage("status")) 
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            // 
        })
    },
    update:{
        body: joi.object({
            name:joi.string().required().max(100).regex( /^[a-zA-Z\s]{3,100}$/).messages(stringMessage("Name",null,100,"alphabets")),
            date_start: joi.date().messages(dateMessage("startdate")),
            date_end: joi.date().messages(dateMessage("enddate")),
            status: joi.string().valid('Active','Inactive').messages(stringMessage("status")) 
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            id:joi.number().required().messages(numMessage('Id'))
        })
    },
    remove:{
        
        params: joi.object({
            //
        }),
        query: joi.object({
            id:joi.number().required().messages(numMessage('Id'))
        })
    },
    getById:{
        
        params: joi.object({
            //
        }),
        query: joi.object({
            id:joi.number().required().messages(numMessage('Id'))
        })
    }
}