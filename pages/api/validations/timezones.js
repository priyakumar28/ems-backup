const Joi = require('joi');
const { update } = require('../services/employees/basic');
module.exports={
    create:{
        body:Joi.object({

            name:Joi.string(100).default("").required(),
            details: Joi.string(255).required().label('details')

        }),
        query:Joi.object({
                
        })
    },
update:{
    body:Joi.object({

        name:Joi.string(100).default("").required(),
        details: Joi.string(255).required().label('details')

    }),
        query:Joi.object({
            id:Joi.number().required()
        })
},
delete:{
    query:Joi.object({
      id:Joi.number().required()
    })
},
getById:{
    query:Joi.object({
      id:Joi.number().required()
    })
}
};