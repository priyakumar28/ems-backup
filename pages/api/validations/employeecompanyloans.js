const Joi = require('joi');
module.exports  = {
    create: {
        body: Joi.object({
             employee: Joi.number()
             .required()
             .label('employee'),

             loan: Joi.number()
             .label('loan'),

             start_date: Joi.date()
             .required()
             .label('start_date'),

             last_installment_date: Joi.date()
             .required()
             .label('last_installment_date'),

             period_months: Joi.number()
             
             .label('period_months'),

             currency: Joi.number()
             
             .label('currency'),

             amount: Joi.number()
             .label('amount'),

             monthly_installment: Joi.number()
             .label('monthly_installment'),

             status: Joi.valid('Approved','Repayment','Paid','Suspended')
             .label('status'),

             details: Joi.string()
             .min(1)
             .max(255)
             .label('details'),

        }),
        params: Joi.object({
            
        }),
        query: Joi.object({
            
        })
    },
    
    update: {
        body: Joi.object({
            employee: Joi.number()
            .label('employee'),

            loan: Joi.number()
            .label('loan'),

            start_date: Joi.date()
            .label('start_date'),

            last_installment_date: Joi.date()
            .label('last_installment_date'),

            period_months: Joi.number()
            
            .label('period_months'),

            currency: Joi.number()
            
            .label('currency'),

            amount: Joi.number()
            .label('amount'),

            monthly_installment: Joi.number()
            .label('monthly_installment'),

            status: Joi.valid('Approved','Repayment','Paid','Suspended')
            .label('status'),

            details: Joi.string()
            .min(1)
            .max(255)
            .label('details'),

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
};
