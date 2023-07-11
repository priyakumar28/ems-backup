const Joi = require('joi');
module.exports = {
    create: {
        body: Joi.object({

            time: Joi.date()
            .label('time'),

            user_id: Joi.number()
            .required()
            .label('user_id'),

            ip: Joi.string().required().min(1).when('type', {
                is: 'ip',
                then: Joi.string().ip({
                  version: [
                    'ipv4',
                  ]
                })
            }),
        

            type: Joi.string()
            .required()
            .min(1)
            .max(100)
            .regex(/^[A-Za-z\s]{1,100}$/),

            employee: Joi.string()
            .min(1)
            .max(300)
            .regex(/^[A-Za-z\s]{1,300}$/),

            details: Joi.string()
            .regex(/^[A-Za-z0-9!-*\s]{10,255}$/),
        }),
        params: Joi.object({
            
        }),
        query: Joi.object({
            
        })
    },
    update: {
        body: Joi.object({

            time: Joi.date()
            .label('time'),

            user_id: Joi.number()
            .label('user_id'),

            ip: Joi.string().required().min(1).when('type', {
                is: 'ip',
                then: Joi.string().ip({
                  version: [
                    'ipv4',
                  ]
                })
            }),

            type: Joi.string()
            .min(1)
            .max(100)
            .regex(/^[A-Za-z\s]{1,100}$/),

            employee: Joi.string()
            .min(1)
            .max(300)
            .regex(/^[A-Za-z\s]{1,300}$/),

            details: Joi.string()
            .regex(/^[A-Za-z0-9!-*\s]{10,255}$/),
        }),
        params: Joi.object({
             
        }),
        query: Joi.object({
           id: Joi.required()
        }),
    },
    getById:{
        params: Joi.object({
            
        }),
        query: Joi.object({
            id: Joi.required()
         }),
    },
    delete:{
        params: Joi.object({
            
        }),
        query: Joi.object({
            id: Joi.required()
         }),
    }
}