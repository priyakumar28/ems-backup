const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number(),
            ethnicity: Joi.number()


        }),
        params: Joi.object({

        }),
    },
    getById: {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    update: {
        body: Joi.object({
            employee: Joi.number(),
            ethnicity: Joi.number()


        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    delete: {
        query: Joi.object({
            id: Joi.number().required()

        })
    }
};