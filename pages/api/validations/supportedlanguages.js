const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            
            name: Joi.string(100).default("").label("name"),
            description: Joi.string(100).default("").label("description"),

        })
    },

    update : {
        body: Joi.object({

            name: Joi.string(100).default("").label("name"),
            description: Joi.string(100).default("").label("description"),
                 
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