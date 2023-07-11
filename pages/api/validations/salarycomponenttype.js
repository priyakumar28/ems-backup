const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({

            code: Joi.string(10).required().label("code"),
            name: Joi.string(100).label("name"),
        })
    },

    update : {
        body: Joi.object({
            
            code: Joi.string(10).required().label("code"),
            name: Joi.string(100).label("name"),
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