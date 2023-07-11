const Joi = require('joi');

module.exports = {
    create: {
        body: Joi.object({
            employee: Joi.number()
                .label('employee'),

            document: Joi.number()
                .label('document'),

            date_added: Joi.date()
                .required().label('date_added'),

            valid_until: Joi.date()
                .required().label('valid_until'),

            approval_status: Joi.string()

                .min(1)
                .max(255).label('status'),

            details: Joi.string()

                .min(1)
                .max(255).label('details'),

            attachment: Joi.string()
                .label('attachment'),

            signature: Joi.string()

                .min(1)
                .max(255)
                .label('signature'),

            expire_notification_last: Joi.number()

                .min(1)
                .max(255).label('expire_notification_last'),


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

        body: Joi.object({
            employee: Joi.number()
                .label('employee'),

            document: Joi.number()
                .label('document'),

            date_added: Joi.date()
                .label('date_added'),

            valid_until: Joi.date()
                .label('valid_until'),

            approval_status: Joi.string()
                .min(1)
                .max(255).label('status'),

            details: Joi.string()
                .min(1)
                .max(255).label('details'),

            attachment: Joi.string()
                .min(3)
                .max(255).label('attachment'),

            signature: Joi.string()
                .min(3)
                .max(255)
                .label('signature'),

            expire_notification_last: Joi.number()
                .label('expire_notification_last'),
        }),
        params: Joi.object({


        }),
        query: Joi.object({
            id: Joi.number().required()
        })

    },


    delete: {
        params: Joi.object({

        }),
        query: Joi.object({
            id: Joi.number().required()
        })


    }
} 