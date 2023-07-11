const Joi = require('joi');

module.exports = {

    create:{
        body: Joi.object({
            type: Joi.string(100).required().label('type'),
            element: Joi.number().required().label('element'),
            user_id: Joi.number().label('user_id'),
            data: Joi.string(500).required().label('data'),
            status_from: Joi.string().valid("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing").default("Pending").label('status_from'),
            status_to: Joi.string().valid("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing").default("Pending").label('status_to'),
            created: Joi.date().label('created')
        })
    },
    update:{
        body: Joi.object({

            type: Joi.string(100).required().label('type'),
            element: Joi.number().required().label('element'),
            user_id: Joi.number().label('user_id'),
            data: Joi.string(500).required().label('data'),
            status_from: Joi.string().valid("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing").default("Pending").label('status_from'),
            status_to: Joi.string().valid("Approved","Pending","Rejected","Cancellation Requested","Cancelled","Processing").default("Pending").label('status_to'),
            created: Joi.date().label('created')
        }),
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    getById:{
        query: Joi.object({
            id: Joi.number().required()
        })
    },
    delete:{
        query: Joi.object({
            id: Joi.number().required()
        })
    }
}