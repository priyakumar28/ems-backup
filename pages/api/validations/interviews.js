const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            job: Joi.number().required().messages({
                "number.base": `"Job" should be a number`,
                "any.required": `"Job" is reqired field`
            }),

            candidate: Joi.number().required().messages({
                "number.base": `"Candidate" should be a number`,
                "any.required": `"Candidate" is reqired field`
            }),

            level:Joi.string()
                .regex(/^[a-zA-Z\s]{3,30}$/)
                .required()
                .max(100).label('Level').messages({
                    "string.base": `"Level" should be a type of string`,

                    "string.max": `"Level" must contain maximum of 100 characters`,

                    "string.pattern.base": `"Level" must contain only alphabets`,

                    "any.required": `"Level" is a required field`
                }),

            created: Joi.date().messages({
                "date.base": `"Created" should be a type of date`,
            }),

            updated: Joi.date().messages({
                "date.base": `"Updated" should be a type of date`,
            }),

            scheduled: Joi.date().messages({
                "date.base": `"Scheduled" should be a type of date`,
            }),

            location: Joi.string()
                    .max(500).label('Label').messages({
                        "string.base": `"Location" should be a type of string`,
    
                        "string.max": `"Location" must contain maximum of 500 characters`,
                    }),

            mapid: Joi.number().messages({
                "number.base": `"Mapid" should be a number`,
                "any.required": `"Mapid" is reqired field`
            }),

            status: Joi.string()
                    .max(100).label('Status').messages({
                        "string.base": `"Status" should be a type of string`,
    
                        "string.max": `"Status" must contain maximum of 100 characters`,
                    }),
                
            notes: Joi.string().messages({
                "string.base": `"Notes" should be a type of string`,
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
            job: Joi.number().required().messages({
                "number.base": `"Job" should be a number`,
                "any.required": `"Job" is reqired field`
            }),

            candidate: Joi.number().required().messages({
                "number.base": `"Candidate" should be a number`,
                "any.required": `"Candidate" is reqired field`
            }),

            level:Joi.string()
                .regex(/^[a-zA-Z\s]{3,30}$/)
                .required()
                .max(100).label('Level').messages({
                    "string.base": `"Level" should be a type of string`,

                    "string.max": `"Level" must contain maximum of 100 characters`,

                    "string.pattern.base": `"Level" must contain only alphabets`,

                    "any.required": `"Level" is a required field`
                }),
            created: Joi.date().messages({
                    "date.base": `"Created" should be a type of date`,
                }),

            updated: Joi.date().messages({
                    "date.base": `"Updated" should be a type of date`,
                }),

            scheduled: Joi.date().messages({
                    "date.base": `"Scheduled" should be a type of date`,
                }),
            location: Joi.string()
                    .max(500).label('Label').messages({
                        "string.base": `"Location" should be a type of string`,
    
                        "string.max": `"Location" must contain maximum of 500 characters`,
    
                    }),

            mapid: Joi.number(),

            status: Joi.string()
            .max(100).label('Status').messages({
                "string.base": `"Status" should be a type of string`,

                "string.max": `"Status" must contain maximum of 100 characters`,
            }),
                
            notes: Joi.string().messages({
                "string.base": `"Notes" should be a type of string`,
            }),
              
        }),

        params: Joi.object({
                
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
            
    }
};