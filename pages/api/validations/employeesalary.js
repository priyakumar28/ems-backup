const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number().required().label('employee'),
            component: Joi.number().required().label('component'),
            pay_frequency: Joi.string.valid("Hourly","Daily","Bi Weekly","Weekly","Semi Monthly","Monthly").label('pay_frequency'),
            currency:Joi.number().label('currency'),
            amount: Joi.number().required().label('amount'),
            details: Joi.string().label('details')

        })
    },

    update : {
        body: Joi.object({  
            
        employee: Joi.number().required().label('employee'),
        component: Joi.number().required().label('component'),
        pay_frequency: Joi.string.valid("Hourly","Daily","Bi Weekly","Weekly","Semi Monthly","Monthly").label('pay_frequency'),
        currency:Joi.number().label('currency'),
        amount: Joi.number().required().label('amount'),
        details: Joi.string().label('details')
 
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },

    getById : {
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    
    delete : {
        query: Joi.object({
            id: Joi.number().required()
        })
    }

};