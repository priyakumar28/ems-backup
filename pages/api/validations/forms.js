const Joi = require('joi');

module.exports = {

    create: {
        body: Joi.object({
            name: Joi.string()
                .min(5)
                .max(50)
                .label('Name'),

            description: Joi.string()
                .required()
                .min(10)
                .max(500)
                .label('Description'),

            items: Joi.string()
                .required(),

            created: Joi.date(),

            updated: Joi.date(),
        }),
    },


    getById: {
        query: Joi.object({
            id: Joi.required()
        }),
    },

    remove: {
        query: Joi.object({
            id: Joi.number().required()
        }),
    },

    update: {
        body: Joi.object({
            name: Joi.string()
            .min(5)
            .max(50)
            .label('Name'),

        description: Joi.string()
            .required()
            .min(10)
            .max(500)
            .label('Description'),

        items: Joi.string()
            .required(),

        created: Joi.date(),

        updated: Joi.date(),  

        }),
        query: Joi.object({
            id: Joi.required()
        })
    }
};
