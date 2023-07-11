const joi = require('joi');

const stringMessage = (fieldName, min=null,max=null,pat=null) => {
    return {
       "string.base": fieldName + "should be a type of string",
       "string.empty": fieldName + " cannot be an empty field",
       "string.min": fieldName + " should have a minimum length of " + min,
       "string.max": fieldName + " should have a maximum length of " + max,
       "string.pattern.base": fieldName + " must contain only" + pat,
       "string.alphanum": fieldName + " must contain only alphanumeric",
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
module.exports ={
    create:{
        body: joi.object({
            menu:joi.string().max(30).messages(stringMessage("Menu")),
            name:joi.string().required().max(100).messages(stringMessage("Name")),
            label:joi.string().max(100).messages(stringMessage("Label")),
            icon:joi.string().optional().allow('').max(50).messages(stringMessage("Icon")),
            mod_group:joi.string().max(30).messages(stringMessage("'ModuleGroup")),
            mod_order:joi.number().messages(numMessage("ModOrder")),
            status:joi.string().valid('Enabled','Disabled').messages(stringMessage("Status")),
            version: joi.string().max(10).messages(stringMessage("Version")),
            update_path: joi.string().max(500).messages(stringMessage("UpdatePath")),
            user_levels: joi.string().max(500).messages(stringMessage("UserLevel")),
            user_roles: joi.string().messages(stringMessage("UserRoles"))
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
            menu: joi.string().max(30).messages(stringMessage("Menu")),
            name: joi.string().required().max(100).messages(stringMessage("Name")),
            label: joi.string().max(100).messages(stringMessage("Label")),
            icon: joi.string().optional().allow('').max(50).messages(stringMessage("Icon")),
            mod_group: joi.string().max(30).messages(stringMessage("'ModuleGroup")),
            mod_order: joi.number().messages(numMessage("ModOrder")),
            status: joi.string().valid('Enabled', 'Disabled').messages(stringMessage("Status")),
            version: joi.string().max(10).messages(stringMessage("Version")),
            update_path: joi.string().max(500).messages(stringMessage("UpdatePath")),
            user_levels: joi.string().max(500).messages(stringMessage("UserLevel")),
            user_roles: joi.string().messages(stringMessage("UserRoles"))
        }),
        params: joi.object({
            //
        }),
        query: joi.object({
            id:joi.number().required().messages(numMessage("Id"))
        })
    },
    remove:{
        
        params: joi.object({
            //
        }),
        query: joi.object({
            id:joi.number().required().messages(numMessage("Id"))
        })
    },
    getById:{
        
        params: joi.object({
            //
        }),
        query: joi.object({
            id:joi.number().required().messages(numMessage("Id"))
        })
    }
}