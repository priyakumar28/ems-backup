const Joi = require('joi');

module.exports = {
       create: {
        
            body: Joi.object({
                name: Joi.string(250).required().label('name')
            }),
    },    
    update: {
        
            body: Joi.object({
                name: Joi.string(250).required().label('name')
            }),

    query: Joi.object({
        id: Joi.number().required() 
    }),
    
},

getById:{
    query: Joi.object({
        id: Joi.number().required()
    }),
},

delete:{
    query: Joi.object({
        id: Joi.number().required()
    }),
}

};
