const Joi = require('joi');
const joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            subject: Joi.string()
                    .required()
                    .max(300).label('Subject'),

            toemail: Joi.string().email({ tlds: { allow: false } })
                    .required()
                    .max(300).label('toemail'),

            template: Joi.string(),

            params: Joi.string(),

            cclist: Joi.string()
                    .max(500).label('cclist'),

            bcclist: Joi.string()
                    .max(500).label('bcclist'),

            error: Joi.string()
                    .max(500).label('error'),

            created: Joi.date(),

            updated: Joi.date(),

            status: Joi.string()
                    .valid('Pending','Sent','Error')
                    
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
    
    update: {
        body: joi.object({
            subject: Joi.string()
                    .required()
                    .max(300).label('Subject'),

            toemail: Joi.string()
                    .max(300).label('toemail'),

            template: Joi.string(),
                    
            params: Joi.string(),

            cclist: Joi.string()
                    .max(500).label('cclist'),

            bcclist: Joi.string()
                    .max(500).label('bcclist'),

            error: Joi.string()
                    .max(500).label('error'),

            created: Joi.date(),

            updated: Joi.date(),

            status: Joi.string()
                    .valid('Pending','Sent','Error')
        }),

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
    }
};