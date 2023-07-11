const Joi = require('joi');

module.exports = {
    create:{
         body: Joi.object({
            code: Joi.string()
            .required()
            .min(6)
            .max(128)
            .label('code'),
            name: Joi.string()
            .required()
            .min(6)
            .max(128)
            .message({ "string.base": `"name" should be a type of string`,

            "string.max": `"name" must contain maximum of 128 characters`,

            "string.pattern.base": `"name" must contain only number`,

            "any.required": `"name" is a required field`})
            .label('name'),
            description: Joi.string()
            .required()
            .min(6)
            .max(128).label('description'),
            specification: Joi.string()
            .required()
            .min(6)
            .max(128).label('specification'),
         }),
         params: Joi.object({

         }),
         query: Joi.object({
            
         })

    },


update:{

    body: Joi.object({
        code: Joi.string()
        .min(6)
        .max(128).label('code'),

        name: Joi.string()
        .min(6)
        .max(128)
        .message({ "string.base": `"name" should be a type of string`,

            "string.max": `"name" must contain maximum of 128 characters`,

            "string.pattern.base": `"name" must contain only number`,

            "any.required": `"name" is a required field`})
            .label('name'),

        description: Joi.string()
        .min(6)
        .max(128).label('description'),

        specification: Joi.string()
        .min(6)
        .max(128).label('specification'),
     }),
     params: Joi.object({
        

     }),
     query: Joi.object({
        id: Joi.number().required()
     })

},
getById:{
    params: Joi.object({
        
    }),
    query: Joi.object({
        id: Joi.number().required()
    })

}  ,
delete:{
    params: Joi.object({
      
    }),
    query: Joi.object({
        id: Joi.number().required()

    })

}


};