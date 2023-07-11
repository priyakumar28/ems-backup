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
            name:joi.string().required().min(3).max(100).regex( /^[a-zA-Z\s]{3,100}$/).messages(stringMessage("Name",null,100,"alphabets")),
            details: joi.string().messages(stringMessage("Details")),
            parameters: joi.string().messages(stringMessage("Parameters")),
            query: joi.string().messages(stringMessage("Query")),
            paramorder: joi.string().max(500).required().messages(stringMessage("Paramorder",null,500)),
            type: joi.string().valid('Query','Class').messages(stringMessage("Type")),
            report_group: joi.string().max(500).messages(stringMessage("ReportGroup",null,500)),
            output: joi.string().max(15).required().messages(stringMessage("Output",null,15))
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
            name:joi.string().required().min(3).max(100).regex( /^[a-zA-Z\s]{3,100}$/).messages(stringMessage("Name",null,100,"alphabets")),
            details: joi.string().messages(stringMessage("Details")),
            parameters: joi.string().messages(stringMessage("Parameters")),
            query: joi.string().messages(stringMessage("Query")),
            paramorder: joi.string().max(500).required().messages(stringMessage("Paramorder",null,500)),
            type: joi.string().valid('Query','Class').messages(stringMessage("Type")),
            report_group: joi.string().max(500).messages(stringMessage("ReportGroup",null,500)),
            output: joi.string().max(15).required().messages(stringMessage("Output",null,15))
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



//regex( /^[a-zA-Z\s]{5,100}$/)