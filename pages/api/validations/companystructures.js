const Joi = require("joi");

module.exports = {

    create: {
        
        body : Joi.object({

            title: Joi.string()
                      .required()
                      .label('title')
                      .messages({
                          "string.base":"This field must be a string",
                          "any.required":"This field is required"
                      }),
                    
            description: Joi.string()
                            .required()
                            .label('description')
                            .messages({
                                "string.base":"This field must be a string",
                                "any.required":"This field is required"
                            }),

            address: Joi.string()
                        .label('address')
                        .messages({
                            "string.base":"This field must be a string"
                        }),

            type: Joi.string()
                     .valid("Company","Head Office","Regional Office","Department","Unit","Sub Unit","Other")
                     .label('type')
                     .messages({
                         "string.base":"This field must be a string",
                         "string.valid":`Choose from "Company","Head Office","Regional Office","Department","Unit","Sub Unit","Other"`
                     }),

            country: Joi.string()
                        .max(3)
                        .required()
                        .default("0")
                        .label('country')
                        .messages({
                            "string.base":"This field must be a string",
                            "string.max":"This field can have less than or equal to 2 characters"
                        }),

            parent: Joi.number()
                       .label('parent')
                       .messages({
                           "number.base":"This field must be a number",
                       }),

            timezone: Joi.string()
                         .required()
                         .max(100)
                         .default("Europe\/London")
                         .label('timezone')
                         .messages({
                             "string.base":"This field must be a string",
                             "any.required":"This field is required"
                         }),

            heads: Joi.string()
                      .max(255)
                      .default(null)
                      .label('heads')
                      .messages({
                          "string.base":"This field must be a string",
                          "string.max":"This field can have a max of 255 characters"
                      }),
        }),
    },

    update: {

        body : Joi.object({

            title: Joi.string()
                      .required()
                      .label('title')
                      .messages({
                          "string.base":"This field must be a string",
                          "any.required":"This field is required"
                      }),
                    
            description: Joi.string()
                            .required()
                            .label('description')
                            .messages({
                                "string.base":"This field must be a string",
                                "any.required":"This field is required"
                            }),

            address: Joi.string()
                        .label('address')
                        .messages({
                            "string.base":"This field must be a string"
                        }),

            type: Joi.string()
                     .valid("Company","Head Office","Regional Office","Department","Unit","Sub Unit","Other")
                     .label('type')
                     .messages({
                         "string.base":"This field must be a string",
                         "string.valid":`Choose from "Company","Head Office","Regional Office","Department","Unit","Sub Unit","Other"`
                     }),

            country: Joi.string()
                        .max(2)
                        .required()
                        .default("0")
                        .label('country')
                        .messages({
                            "string.base":"This field must be a string",
                            "string.max":"This field can have less than or equal to 2 characters"
                        }),

            parent: Joi.number()
                       .label('parent')
                       .messages({
                           "number.base":"This field must be a number",
                       }),

            timezone: Joi.string()
                         .required()
                         .max(100)
                         .default("Europe\/London")
                         .label('timezone')
                         .messages({
                             "string.base":"This field must be a string",
                             "any.required":"This field is required"
                         }),

            heads: Joi.string()
                      .max(255)
                      .default(null)
                      .label('heads')
                      .messages({
                          "string.base":"This field must be a string",
                          "string.max":"This field can have a max of 255 characters"
                      }),
        }),
        query: Joi.object({

            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        }),
    },

    getById: {
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        }),
    },
    delete: {
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        }),
    }   
 }

