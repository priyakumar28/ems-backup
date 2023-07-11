const Joi = require('joi');
module.exports = {
    create: {
        body : Joi.object({
            first_name: Joi.string()
            .min(3)
            .max(250)
           .regex( /^[A-Za-z\s]{3,250}$/)
           .message({ "string.base": `"first_name" should be a type of string`,

             "string.max": `"first_name" must contain maximum of 250 letters`,

             "string.pattern.base": `"first_name" must contain only alphabets `,

             "any.required": `"first_name" is a required field`})
            .required()
            .label('first_name'),

            last_name: Joi.string()
            .min(3)
            .max(250)
           .regex( /^[A-Za-z\s]{3,250}$/)
           .message({ "string.base": `"last_name" should be a type of string`,

             "string.max": `"last_name" must contain maximum of 250 letters`,

             "string.pattern.base": `"last_name" must contain only alphabets `,

             "any.required": `"last_name" is a required field`})
            .required()
            .label('last_name'),

            nationality: Joi.number()
            .label('nationality'),

            birthday: Joi.date()
            .label('birthday'),

            gender:Joi.valid('Male','Female')
            .label('gender'),

            marital_status: Joi.valid('Married','Single','Divorced','Widowed','Others')
            .label('marital_status'),

            address1: Joi.string()
            .min(3)
            .max(250)
            .label('address1'),

            address2: Joi.string()
            .min(3)
            .max(250)
            .label('address2'),

            city: Joi.string()
            .min(1)
            .max(128)
            .regex( /^[A-Za-z\s]{3,250}$/)
            .message({ "string.base": `"city" should be a type of string`,

             "string.max": `"city" must contain maximum of 250 characters`,

             "string.pattern.base": `"city" must contain only alphabets`,

             "any.required": `"city" is a required field`})
            .label('city'),

            country: Joi.string()
            .min(1)
            .max(128)
            .regex( /^[A-Za-z\s] {3,250}$/)
            .message({ "string.base": `"country" should be a type of string`,

             "string.max": `"country" must contain maximum of 250 characters`,

             "string.pattern.base": `"country" must contain only alphabets`,

             "any.required": `"country" is a required field`})
            .label('country'),

            province: Joi.number()
            .label('province'),

            postal_code:Joi.string()
            .label('postal_code'),

            email: Joi.string().email({ tlds: { allow: false } })
    
                    .max(300).label('email'),
            
            home_phone: Joi.string()
            .min(10)
            .max(10)
            .regex( /^[0-9]+$/) 
            .message({ "string.base": `"home_phone" should be a type of string`,

             "string.max": `"home_phone" must contain maximum of 250 characters`,

             "string.pattern.base": `"home_phone" must contain only numbers`,

             "any.required": `"home_phone" is a required field`}) 
            .label('home_phone'),
            
            mobile_phone: Joi.string()
            .min(10)
            .max(10) 
            .regex( /^[0-9]+$/) 
            .message({ "string.base": `"mobile_phone" should be a type of string`,

             "string.max": `"mobile_phone" must contain maximum of 250 characters`,

             "string.pattern.base": `"mobile_phone" must contain only numbers`,

             "any.required": `"mobile_phone" is a required field`}) 
            .label('mobile_phone'),

            cv_title: Joi.string()
            .min(1)
            .max(128)
            .label('cv_title'),

            cv: Joi.string()
            .min(1)
            .max(128)
            .label('cv'),

            cvtext: Joi.string()
            .min(1)
            .max(250)
            .label('cvtext'),

            industry: Joi.string()
            .min(1)
            .max(250)
            .label('industry'),

            profileimage: Joi.string()
            .min(1)
            .max(250)
            .label('profileimage'),


            head_line: Joi.string()
            .min(1)
            .max(250)
            .label('head_line'),

            objective: Joi.string()
            .min(1)
            .max(250)
            .label('objective'),

            work_history: Joi.string()
            .min(1)
            .max(250)
            .label('work_history'),

            education: Joi.string()
            .min(1)
            .max(250)
            .label('education'),


            skills: Joi.string()
            .min(1)
            .max(250)
            .label('skills'),

            referees:Joi.string()
            .min(1)
            .max(250)
            .label('referees'),

            linkedinurl: Joi.string()
            .min(1)
            .max(250)
            .label('linkedinurl'),

            linkedindata:Joi.string()
            .min(1)
            .max(250)
            .label('linkedindata'),

            totalyearsofexperience:Joi.number()
            .min(1)
            .max(250)
            .label('totalyearsofexperience'),

        
            totalmonthsofexperience:Joi.number()
            .min(1)
            .max(250)
            .label('totalmonthsofexperience'),

            htmlcvdata:Joi.string()
            .min(1)
            .max(250)
            .label('htmlcvdata'),

            generatedcvfile:Joi.string()
            .min(1)
            .max(250)
            .label('generatedcvfile'),


            created:Joi.date()
            .min(1)
            .max(250)
            .label('created'),

            updated:Joi.date()
            .min(1)
            .max(250)
            .label('updated'),

            expectedsalary:Joi.number()
            .min(1)
            .max(250)
            .label('expectedsalary'),

            preferedpositions: Joi.string()
            .min(1)
            .max(250)
            .label('preferredpositions'),

            preferedjobtype:Joi.string()
            .min(1)
            .max(250)
            .label('preferredjobtype'),

            preferedcountries: Joi.string()
            .min(1)
            .max(250)
            .label('preferredcountries'),

            tags: Joi.string()
            .min(1)
            .max(250)
            .label('tags'),

            notes: Joi.string()
            .min(1)
            .max(250)
            .label('notes'),

            calls:Joi.string()
            .min(1)
            .max(250)
            .label('calls'),

            age:Joi.number()
            .label('age'),

            hash:Joi.string()
            .min(1)
            .max(250)
            .label('hash'),


            linkedinprofilelink: Joi.string()
            .min(1)
            .max(250)
            .label('linkedinprofilelink'),

            linkedinprofileid:Joi.string()
            .min(1)
            .max(250)
            .label('linkedinprofileid'),


            facebookprofilelink:Joi.string()
            .min(1)
            .max(250)
            .label('facebookprofilelink'),
            

            facebookprofileid: Joi.string()
            .min(1)
            .max(250)
            .label('facebookprofileid'),

            twitterprofilelink:Joi.string()
            .min(1)
            .max(250)
            .label('twitterprofilelink'),

            twitterprofileid:Joi.string()
            .min(1)
            .max(250)
            .label('twitterprofileid'),

            googleprofilelink:Joi.string()
            .min(1)
            .max(250)
            .label('googleprofilelink'),


            googleprofileid:Joi.string()
            .min(1)
            .max(250)
            .label('googleprofileid'),
   
        }),
        params: Joi.object({
            
        }),
        query: Joi.object({
            
        })

    },
    update: {
        body: Joi.object({
            first_name: Joi.string()
            .min(3)
            .max(250)
           .regex( /^[A-Za-z\s]{3,250}$/)
           .message({ "string.base": `"first_name" should be a type of string`,

             "string.max": `"first_name" must contain maximum of 250 characters`,

             "string.pattern.base": `"first_name" must contain only alphabets`,

             "any.required": `"first_name" is a required field`})
            .label('first_name'),

            last_name: Joi.string()
            .min(3)
            .max(250)
           .regex( /^[A-Za-z\s]{3,250}$/)
           .message({ "string.base": `"last_name" should be a type of string`,

             "string.max": `"last_name" must contain maximum of 250 characters`,

             "string.pattern.base": `"last_name" must contain only alphabets`,

             "any.required": `"last_name" is a required field`})
            .label('last_name'),

            nationality: Joi.number()
            .label('nationality'),

            birthday: Joi.date()
            .label('birthday'),

            gender:Joi.valid('Male','Female')
            .label('gender'),

            marital_status: Joi.valid('Married','Single','Divorced','Widowed','Others')
            .label('marital_status'),

            address1: Joi.string()
            .min(3)
            .max(250)
            .label('address1'),

            address2: Joi.string()
            .min(3)
            .max(250)
            .label('address2'),

            city: Joi.string()
            .min(1)
            .max(128)
            .regex( /^[A-Za-z\s]{3,250}$/)
            .message({ "string.base": `"city" should be a type of string`,

             "string.max": `"city" must contain maximum of 250 characters`,

             "string.pattern.base": `"city" must contain only alphabets`,

             "any.required": `"city" is a required field`})
            .label('city'),

            country: Joi.string()
            .min(1)
            .max(128)
            .regex( /^[A-Za-z\s] {3,250}$/)
            .message({ "string.base": `"country" should be a type of string`,

             "string.max": `"country" must contain maximum of 250 characters`,

             "string.pattern.base": `"country" must contain only alphabets`,

             "any.required": `"country" is a required field`})
            .label('country'),

            province: Joi.number()
            .label('province'),

            postal_code:Joi.string()
            .label('postal_code'),

            email: Joi.string().email({ tlds: { allow: false } })
    
                    .max(300).label('email'),
            
            home_phone: Joi.string()
            .min(10)
            .max(10)
            .regex( /^[0-9]+$/)
            .message({ "string.base": `"home_phone" should be a type of string`,

             "string.max": `"home_phone" must contain maximum of 250 characters`,

             "string.pattern.base": `"home_phone" must contain only numbers`,

             "any.required": `"home_phone" is a required field`}) 
            .label('home_phone'),
            
            mobile_phone: Joi.string()
            .min(10)
            .max(10) 
            .regex( /^[0-9]+$/) 
            .message({ "string.base": `"mobile_phone" should be a type of string`,

             "string.max": `"mobile_phone" must contain maximum of 250 characters`,

             "string.pattern.base": `"mobile_phone" must contain only numbers`,

             "any.required": `"mobile_phone" is a required field`}) 
            .label('mobile_phone'),

            cv_title: Joi.string()
            .min(1)
            .max(128)
            .label('cv_title'),

            cv: Joi.string()
            .min(1)
            .max(128)
            .label('cv'),

            cvtext: Joi.string()
            .min(1)
            .max(250)
            .label('cvtext'),

            industry: Joi.string()
            .min(1)
            .max(250)
            .label('industry'),

            profileimage: Joi.string()
            .min(1)
            .max(250)
            .label('profileimage'),


            head_line: Joi.string()
            .min(1)
            .max(250)
            .label('head_line'),

            objective: Joi.string()
            .min(1)
            .max(250)
            .label('objective'),

            work_history: Joi.string()
            .min(1)
            .max(250)
            .label('work_history'),

            education: Joi.string()
            .min(1)
            .max(250)
            .label('education'),


            skills: Joi.string()
            .min(1)
            .max(250)
            .label('skills'),

            referees:Joi.string()
            .min(1)
            .max(250)
            .label('referees'),

            linkedinurl: Joi.string()
            .min(1)
            .max(250)
            .label('linkedinurl'),

            linkedindata:Joi.string()
            .min(1)
            .max(250)
            .label('linkedindata'),

            totalyearsofexperience:Joi.number()
            .min(1)
            .max(250)
            .label('totalyearsofexperience'),

        
            totalmonthsofexperience:Joi.number()
            .min(1)
            .max(250)
            .label('totalmonthsofexperience'),

            htmlcvdata:Joi.string()
            .min(1)
            .max(250)
            .label('htmlcvdata'),

            generatedcvfile:Joi.string()
            .min(1)
            .max(250)
            .label('generatedcvfile'),


            created:Joi.date()
            .min(1)
            .max(250)
            .label('created'),

            updated:Joi.date()
            .min(1)
            .max(250)
            .label('updated'),

            expectedsalary:Joi.number()
            .min(1)
            .max(250)
            .label('expectedsalary'),

            preferedpositions: Joi.string()
            .min(1)
            .max(250)
            .label('preferredpositions'),

            preferedjobtype:Joi.string()
            .min(1)
            .max(250)
            .label('preferredjobtype'),

            preferedcountries: Joi.string()
            .min(1)
            .max(250)
            .label('preferredcountries'),

            tags: Joi.string()
            .min(1)
            .max(250)
            .label('tags'),

            notes: Joi.string()
            .min(1)
            .max(250)
            .label('notes'),

            calls:Joi.string()
            .min(1)
            .max(250)
            .label('calls'),

            age:Joi.number()
            .label('age'),

            hash:Joi.string()
            .min(1)
            .max(250)
            .label('hash'),


            linkedinprofilelink: Joi.string()
            .min(1)
            .max(250)
            .label('linkedinprofilelink'),

            linkedinprofileid:Joi.string()
            .min(1)
            .max(250)
            .label('linkedinprofileid'),


            facebookprofilelink:Joi.string()
            .min(1)
            .max(250)
            .label('facebookprofilelink'),
            

            facebookprofileid: Joi.string()
            .min(1)
            .max(250)
            .label('facebookprofileid'),

            twitterprofilelink:Joi.string()
            .min(1)
            .max(250)
            .label('twitterprofilelink'),

            twitterprofileid:Joi.string()
            .min(1)
            .max(250)
            .label('twitterprofileid'),

            googleprofilelink:Joi.string()
            .min(1)
            .max(250)
            .label('googleprofilelink'),


            googleprofileid:Joi.string()
            .min(1)
            .max(250)
            .label('googleprofileid'),
   
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