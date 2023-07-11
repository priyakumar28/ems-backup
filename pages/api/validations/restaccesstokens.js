const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({

            userid: Joi.number().required().label('userid'),
            hash: Joi.string(32).default("").label('hash'),
            token: Joi.string(500).default("").label('token'),
            created: Joi.date().label('created'),
            updated: Joi.date().label('updated')
        })
    },
    update: {
        body: Joi.object({

            userid: Joi.number().required().label('userid'),
            hash: Joi.string(32).default("").label('hash'),
            token: Joi.string(500).default("").label('token'),
            created: Joi.date().label('created'),
            updated: Joi.date().label('updated')
        }),

        query: Joi.object({
            id: Joi.number().required()
        })
    },
    getById: {
        query: Joi.object({
            id
        })
    },
    remove: {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
}