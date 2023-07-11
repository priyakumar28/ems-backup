const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            tabletype: Joi.string().regex(/^[a-zA-Z0-9\s]/)
                    .min(1).max(200).label('Tabletype').messages({
                        "string.base":"tabletype_string_base",

                        "string.min": "tabletype_min",
        
                        "string.max":"tabletype_max",
        
                        "string.pattern.base": "tabletype_pattern_base"
                }),
            data: Joi.string().regex(/^[a-zA-Z0-9\s]/).label('Data').messages({
                "string.base": "dataentrybackups_data_base",
                "string.pattern.base": "data_pattern_base"
        }),
        }),
        params: Joi.object({

        }),
        query: Joi.object({

        })
    },

    getById: {
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    remove: {
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    update: {
        body: Joi.object({
            tabletype: Joi.string().regex(/^[a-zA-Z0-9\s]/)
                    .min(1).max(200).label('Tabletype').messages({
                        "string.base": "tabltype_string_base",

                        "string.min": "tabletype_min",

                        "string.max": "tabletype_max",

                        "string.pattern.base": "tabletype_pattern_base"
                }),
            data: Joi.string().regex(/^[a-zA-Z0-9\s]/).label('Data').messages({
                "string.base": "dataentrybackups_data_base",
                "string.pattern.base": "data_pattern_base"
        }),
        }),
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
            
        })
    }
}