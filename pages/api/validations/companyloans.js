const Joi = require("joi");

module.exports = {

    create:{

        body: Joi.object({

            name: Joi.string()
                     .max(100)
                     .required()
                     .label('name')
                     .messages({
                         "string.base":"This field must be a string",
                         "string.max":"This field can have a maximum of 100 characters",
                         "any.required":"This field cannot be empty"
                     }),

            details: Joi.string()
                        .label('details')
                        .messages({
                            "string.base":"This field must be a string"
                        }),
        }),
    },

    update:{

        body: Joi.object({

            name: Joi.string()
                     .max(100)
                     .required()
                     .label('name')
                     .messages({
                         "string.base":"This field must be a string",
                         "string.max":"This field can have a maximum of 100 characters",
                         "any.required":"This field cannot be empty"
                     }),

            details: Joi.string()
                        .label('details')
                        .messages({
                            "string.base":"This field must be a string"
                        }),
        }),

        query: Joi.object({

            id: Joi.required().messages({
                "any.required":"Here query field cannot be left blank"
            })
        }),
    },

    getById:{

        query: Joi.object({

            id: Joi.required().messages({
                "any.required":"Here query field cannot be left blank"
            })
        }),
    },

    delete:{

        query: Joi.object({

            id: Joi.required().messages({
                "any.required":"Here query field cannot be left blank"
            })
        }),
    },

}