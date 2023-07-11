const Joi = require('joi');

module.exports = {

    create: {
        body: Joi.object({
            name: Joi.string()
                .min(5)
                .max(50)
                .label('Name'),

            filename: Joi.string()
                .min(5)
                .max(50)
                .label('FileName'),

            employee: Joi.number()
                .required(),

            file_group: Joi.string()
                .min(5)
                .max(50)
                .label('FileGroup'),

            size: Joi.number()
                .required(),

            size_text: Joi.string()
                .required()
                .min(5)
                .max(20)
                .label('SizeText')
        }),
    },


    getById: {
        query: Joi.object({
            id: Joi.required()
        }),
    },

    remove: {
        query: Joi.object({
            id: Joi.required()
        }),
    },

    update: {
        body: Joi.object({
            name: Joi.string()
                .min(5)
                .max(50)
                .label('Name'),


            filename: Joi.string()
                .min(5)
                .max(50)
                .label('FileName'),

            employee: Joi.number()
                .required(),

            file_group: Joi.string()
                .min(5)
                .max(100)
                .label('FileGroup'),

            size: Joi.number()
                .required(),

            size_text: Joi.string()
                .required()
                .min(5)
                .max(20)
                .label('SizeText')


        }),
        query: Joi.object({
            id: Joi.required()
        })
    }
};




















