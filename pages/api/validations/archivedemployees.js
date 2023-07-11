const Joi = require('joi');

module.exports = {
       create: {
        
            body: Joi.object({
            ref_id: Joi.number().required(),    
            employee_id: Joi.string().regex(/^[0-9]{6}$/),
            first_name: Joi.string().label('First name').regex(/^[a-zA-Z]{1,128}$/).required(),
            last_name: Joi.string().label('Last name').regex(/^[a-zA-Z]{1,128}$/).required(),
            gender: Joi.valid('Male','Female','Others'),
            ssn_num: Joi.string().min(1).max(100).default(null),
            nic_num: Joi.string().min(1).max(100).default(null),
            other_id: Joi.string().min(1).max(100).default(null),
            work_email: Joi.string().email({tlds : {allow:['com']}}).default(null).required(),
            joined_date: Joi.date().default(null),
            confirmation_date: Joi.date().default(null),
            supervisor: Joi.number(),
            department: Joi.number(),
            termination_date: Joi.date().default(null),
            notes: Joi.string().regex(/^[a-zA-Z0-9!@#$%&*\s,.]{1,255}$/).default(null),
            data: Joi.string().regex(/^[a-zA-Z0-9!@#$%&*\s,.]{1,255}$/).default(null)      
        
    }),

        params: Joi.object({
            //
        }),
        query: Joi.object({
            // 
        })
    },    
    update: {
        
            body: Joi.object({
                ref_id: Joi.number(),    
                employee_id: Joi.string().regex(/^[0-9]{6}$/),
                first_name: Joi.string().label('First name').regex(/^[a-zA-Z]{1,128}$/),
                last_name: Joi.string().label('Last name').regex(/^[a-zA-Z]{1,128}$/),
                gender: Joi.valid('Male','Female','Others'),
                ssn_num: Joi.string().min(1).max(100).default(null),
                nic_num: Joi.string().min(1).max(100).default(null),
                other_id: Joi.string().min(1).max(100).default(null),
                work_email: Joi.string().email({tlds : {allow:['com']}}).default(null),
                joined_date: Joi.date().default(null),
                confirmation_date: Joi.date().default(null),
                supervisor: Joi.number(),
                department: Joi.number(),
                termination_date: Joi.date().default(null),
                notes: Joi.string().regex(/^[a-zA-Z0-9!@#$%&*\s.,]{1,255}$/).default(null),
                data: Joi.string().regex(/^[a-zA-Z0-9!@#$%&*\s,.]{1,255}$/).default(null)      
            
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
