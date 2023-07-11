const Joi = require('joi');

module.exports = {
    create: { 
        body: Joi.object({
            title: Joi.string().required().max(100).regex(/^[a-zA-Z\s]{3,100}$/).default(null).messages({

                "string.base": `"Title" should be a type of string`,

                "string.max": `"Title" must contain maximum of 100 characters`,

                "string.pattern.base": `"Title" must contain only alphabets`,

                "any.required": `"Title" is a required field`

            }),

            shortdescription: Joi.string()
            .min(10)
            .max(100)
            .regex(/^[A-Za-z0-9\s]{3,100}$/)
            .label('shortdescription'),

            description: Joi.string()
            .min(10)
            .max(255)
            .regex(/^[A-Za-z0-9\s]{3,255}$/)
            .label('description'),

            requirements: Joi.string()
            .min(10)
            .max(255).label('requirements'),

            benefits: Joi.string()
            .min(10)
            .max(255)
            .regex(/^[A-Za-z0-9\s]{3,50}$/)
            .label('benefits'),

            country: Joi.number()
            .min(1)
            .max(5)
            .label('country'),

            company: Joi.number()
            .min(1)
            .max(5)
            .label('comapany'),

            department: Joi.string()
            .min(4)
            .max(100)
            .regex(/^[A-Za-z0-9\s]{3,100}$/)
            .label('department'),

            code: Joi.string()
            .min(1)
            .max(20)
            .regex(/^[A-Za-z0-9]{3,20}$/)
            .label('code'),

            employementtype: Joi.number()
            .min(1)
            .max(50)
            .label('employementtype'),

            industry: Joi.number()
            .min(1)
            .max(50)
            .label('industry'),

            experiencelevel: Joi.number()
            .min(1)
            .max(5)
            .label('experiencelevel'),

            jobfunction: Joi.number()
            .min(1)
            .max(50)
            .label('jobfunction'),

            educationlevel: Joi.number()
            .min(1)
            .max(50)
            .label('educationlevel'),

            currency: Joi.number()
            .min(1)
            .max(50)
            .label('currency'),

            showsalary: Joi.valid('Yes','No'),

            salarymin: Joi.number()
            .min(1)
            .max(2000)
            .label('salarymin'),

            salarymax: Joi.number()
            .min(1)
            .max(2000)
            .label('salarymax'),

            keywords: Joi.string()
            .min(5)
            .max(255)
            .regex(/^[A-Za-z\s]{5,255}$/)
            .label('keywords'),

            status: Joi.valid('Active','On hold','Closed'),

            closingdate: Joi.date(),

            attachment: Joi.string()
            .min(5)
            .max(100)
            .regex(/^[A-Za-z\s]{5,100}$/)
            .label('attachment'),

            display: Joi.string()
            .min(4)
            .max(200)
            .regex(/^[A-Za-z\s]{5,200}$/)
            .required()
            .label('display'),

            postedby: Joi.number()
            .min(1)
            .max(20)
            .label('postedby')
        }),
        params: Joi.object({
                
        }),
        query: Joi.object({
            
        })
    },


    update: { 
        body: Joi.object({
            title: Joi.string().required().max(100).regex(/^[a-zA-Z\s]{3,100}$/).default(null).messages({

                "string.base": `"Title" should be a type of string`,

                "string.max": `"Title" must contain maximum of 100 characters`,

                "string.pattern.base": `"Title" must contain only alphabets`,

                "any.required": `"Title" is a required field`

            }),

            shortdescription: Joi.string()
            .min(10)
            .max(100)
            .regex(/^[A-Za-z0-9\s]{3,100}$/)
            .label('shortdescription'),

            description: Joi.string()
            .min(10)
            .max(255)
            .regex(/^[A-Za-z0-9\s]{3,255}$/)
            .label('description'),

            requirements: Joi.string()
            .min(10)
            .max(255).label('requirements'),

            benefits: Joi.string()
            .min(10)
            .max(255)
            .regex(/^[A-Za-z0-9\s]{3,50}$/)
            .label('benefits'),

            country: Joi.number()
            .min(1)
            .max(5)
            //.regex(/^[0-9]{1,3}$/)
            .label('country'),

            company: Joi.number()
            .min(1)
            .max(5)
            .label('comapany'),

            department: Joi.string()
            .min(4)
            .max(100)
            .regex(/^[A-Za-z0-9\s]{3,100}$/)
            .label('department'),

            code: Joi.string()
            .min(1)
            .max(20)
            .regex(/^[A-Za-z0-9]{3,20}$/)
            .label('code'),

            employementtype: Joi.number()
            .min(1)
            .max(50)
            .label('employmenttype'),

            industry: Joi.number()
            .min(1)
            .max(50)
            .label('industry'),

            experiencelevel: Joi.number()
            .min(1)
            .max(50)
            .label('experiencelevel'),

            jobfunction: Joi.number()
            .min(1)
            .max(50)
            .label('jobfunction'),

            educationlevel: Joi.number()
            .min(1)
            .max(50)
            .label('educationlevel'),

            currency: Joi.number()
            .min(1)
            .max(50)
            .label('currency'),

            showsalary: Joi.valid('Yes','No'),

            salarymin: Joi.number()
            .min(1)
            .label('salarymin'),

            salarymax: Joi.number()
            .min(1)
            .label('salarymax'),

            keywords: Joi.string()
            .min(5)
            .max(255)
            .regex(/^[A-Za-z\s]{5,255}$/)
            .label('keywords'),

            status: Joi.valid('Active','On hold','Closed'),

            closingdate: Joi.date(),

            attachment: Joi.string()
            .min(5)
            .max(100)
            .regex(/^[A-Za-z\s]{5,100}$/)
            .label('attachment'),

            display: Joi.string()
            .min(4)
            .max(200)
            .regex(/^[A-Za-z\s]{5,200}$/)
            .label('display'),

            postedby: Joi.number()
            .min(1)
            .max(20)
            .label('postedby')
        }),
        params: Joi.object({
             
                
        }),
        query: Joi.object({
            id:Joi.number().required()
        })
    },

    getById:{
        params: Joi.object({
           
        }),
        query: Joi.object({
            id:Joi.number()
            .required() 
            
        })
    },

    delete:{
        params: Joi.object({
          
        }),
        query: Joi.object({
            id:Joi.number()
            .required() 
            
        })

    }
}
