const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            language_id: Joi.number()
                            .unique()
                            .label("language_id")
                            .messages({
                                "number.base":"This field has to be a number",
                                "number.unique":"The id that you entered has to be unique"
                            }),

            employee: Joi.number()
                         .required()
                         .unique()
                         .label("employee")
                         .messages({
                             "number.base":"This field has to be a number",
                             "any.required":"This field is required",
                             "number.unique":"The employee id that you entered has to be unique"
                         }),

            reading: Joi.string()
                        .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                        .label("reading")
                        .messages({
                            "string.base":"This field has to be a string",
                            "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`                        }),

            speaking: Joi.string()
                        .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                        .label("speaking")
                        .messages({
                            "string.base":"This field has to be a string",
                            "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`
                        }),
            
            writing: Joi.string()
                        .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                        .label("writing")
                        .messages({
                            "string.base":"This field has to be a string",
                            "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`
                        }),

            understanding: Joi.string()
                              .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                              .label("understanding")
                              .messages({
                                  "string.base":"This field has to be a string",
                                  "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`
                        }),
            

        })

    },

    update : {
        body: Joi.object({
            language_id: Joi.number()
                            .unique()
                            .label("language_id")
                            .messages({
                                "number.base":"This field has to be a number",
                                "number.unique":"The id that you entered has to be unique"
                            }),

            employee: Joi.number()
                         .required()
                         .unique()
                         .label("employee")
                         .messages({
                             "number.base":"This field has to be a number",
                             "any.required":"This field is required",
                             "number.unique":"The employee id that you entered has to be unique"
                         }),

            reading: Joi.string()
                        .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                        .label("reading")
                        .messages({
                            "string.base":"This field has to be a string",
                            "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`                        }),

            speaking: Joi.string()
                        .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                        .label("speaking")
                        .messages({
                            "string.base":"This field has to be a string",
                            "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`
                        }),
            
            writing: Joi.string()
                        .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                        .label("writing")
                        .messages({
                            "string.base":"This field has to be a string",
                            "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`
                        }),

            understanding: Joi.string()
                              .valid("Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency")
                              .label("understanding")
                              .messages({
                                  "string.base":"This field has to be a string",
                                  "string.valid":`Choose from "Elementary Proficiency","Limited Working Proficiency","Professional Working Proficiency","Full Professional Proficiency","Native or Bilingual Proficiency"`
                        }),
            

        }),
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        })
    },

    getById : {
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        })
    },
    
    delete : {
        query: Joi.object({
            id: Joi.required().messages({
                "any.required":"Here query is required"
            })
        })
    }

};