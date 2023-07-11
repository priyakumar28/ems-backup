const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            
            name: Joi.string(100).required().label("name"),
            componenttype: Joi.number().label("componenttype"),
            details: Joi.string().label("details"),

        })
    },

    update : {
        body: Joi.object({
            
            name: Joi.string(100).required().label("name"),
            componenttype: Joi.number().label("componenttype"),
            details: Joi.string().label("details"),
                 
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    getById : {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    
    delete : {
        query: Joi.object({
            id: Joi.number().required()
        })
    }

};