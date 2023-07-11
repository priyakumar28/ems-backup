const Joi = require("joi");

const { phone } = require("phone");
//const value = [];

// const isValidEmployeeID = (value, helpers) => {
//   if (value.length == 6) {
//     return value;
//   } else {
//     return new Error("Failed custom validation");
//   }
// };

const stringMessage = (fieldName, min = null, max = null, pat = null) => {
  return {
    "string.base": `${fieldName} should be a string`,
    "string.empty": `${fieldName} cannot be an empty field`,
    "string.min": `${fieldName} should have a minimum length of ${min} characters`,
    "string.max": `${fieldName} should have a maximum length of ${max} characters`,
    "string.pattern.base": `${fieldName} must contain only ${pat}`,
    "string.alphanum": `${fieldName} must contain only alphanumeric`,
    "any.valid": `${fieldName} contains invalid values`,
    "string.email": `${fieldName} must be a valid one`,
    "any.required": `${fieldName} is a required field`,
  };
};

const numMessage = (fieldName, min = null, max = null) => {
  return {
    "number.base": `${fieldName} should be a type of number`,
    "number.min": `${fieldName} should have minimum value ${min}`,
    "number.max": `${fieldName} should be less than or equal to ${max}`,
    "any.required": `${fieldName} is a required field`,
  };
};

module.exports = {
  // POST /v1/employees/create

  /**Sanjeev Gunasekaran 200089 create validation changes @public*/
  create: {
    body: Joi.object({
      first_name: Joi.string()
        .min(1)
        .max(128)
        .required()
        .regex(/^[a-zA-Z\s]{1,128}$/)
        .messages(stringMessage("First Name", 1, 128, "alphabets")),
      middle_name: Joi.string()
        .min(3)
        .max(128)
        .regex(/^[a-zA-Z\s]{3,128}$/)
        .allow(null)
        .allow("")
        .messages(stringMessage("Middle name", 3, 128, "alphabets")),
      last_name: Joi.string()
        .min(1)
        .max(128)
        .regex(/^[a-zA-Z\s]{1,128}$/)
        .message(stringMessage("Last Name", 1, 128, "alphabets")),
      work_phone: Joi.string().custom((numb, helper) => {
        if (!phone(numb).isValid) {
          return helper.message(`The number you have entered is invalid`);
        } else {
          return true;
        }
      }),
      work_email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com"] },
        })
        .required()
        .messages(stringMessage("Work Email")), //allow bassure val
      private_email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com"] },
        })
        .messages(stringMessage("Private Email")),
      designation: Joi.number().allow(null).messages(numMessage("Designation")),
      department: Joi.number().allow(null).messages(numMessage("Department")), //// integer or string?
      gender: Joi.valid("Male", "Female", "Transgender")
        .required()
        .label("Gender")
        .messages(stringMessage("Gender")),
      birthday: Joi.date().required().messages({
        "date.base":
          "Please enter a valid date in DD-MM-YYYY or YYYY-MM-DD format",
      }),
      marital_status: Joi.valid(
        "Married",
        "Single",
        "Divorced",
        "Widowed",
        "Other"
      )
        .required()
        .label("Marital status")
        .messages(stringMessage("Marital status")),
      blood_group: Joi.valid(
        "O -",
        "O +",
        "A -",
        "A +",
        "B -",
        "B +",
        "AB -",
        "AB +"
      )
        .required()
        .label("Blood group")
        .messages(stringMessage("Blood group")),
      status: Joi.string()
        .valid("Active", "Long absence", "Terminated", "Deceased", "Resigned")
        .label("Status")
        .messages(stringMessage("Status")),
      native_state: Joi.string()
        .allow(null)
        .messages(stringMessage("Native state")),
      height: Joi.number()
        .allow(null)
        .min(70)
        .max(240)
        .messages(numMessage("Height", `${70}cm`, `${240}cm`)), ///too personal
      weight: Joi.number()
        .allow(null)
        .min(40)
        .max(150)
        .messages(numMessage("Weight", `${40}kg`, `${150}kg`)), ///too personal
      religion: Joi.valid(
        "Hinduism",
        "Buddhism",
        "Sikhism",
        "Jainism",
        "Taoism",
        "Confucianism",
        `Bahá'í`,
        "Shinto",
        "Zoroastrianism",
        "Judaism",
        "Christianity",
        "Islam",
        "Atheism",
        "Rationalism",
        "Agnosticism",
        "Scepticism",
        "Freethinker",
        "Humanism"
      )
        .required()
        .label("Religion")
        .messages(stringMessage("Religion")),
      nationality: Joi.string()
        .required()
        .min(3)
        .max(3)
        .regex(/^[A-Z\s]{3,3}$/)
        .messages(
          stringMessage(
            "Nationality",
            3,
            3,
            "uppercase alphabets (no numbers or special characters)"
          )
        ), ////verify

      aadhar_number: Joi.string()
        // .regex(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)
        .required()
        .messages({
          "string.pattern.base": "Aadhar number you've entered is invalid",
        }), ////verify

      pan_number: Joi.string()
        .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
        .allow(null)
        .messages({
          "string.pattern.base": "Please enter a valid PAN number",
        }), /////verify
      // passport_num: Joi.string()
      //   .max(100)
      //   .regex(/^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/)
      //   .allow(null)
      //   .messages({
      //     "string.pattern.base": "Please enter a valid passport number",
      //   }), ///verify
      address1: Joi.string()
        .max(100)
        .required()
        .messages(stringMessage("Address", 0, 100)),
      address2: Joi.string()
        .max(100)
        .allow(null)
        .messages(stringMessage("Address", 0, 100)),
      city: Joi.string()
        .min(1)
        .max(150)
        .required()
        .regex(/^[a-zA-Z\s]{1,150}$/)
        .messages(stringMessage("City", 0, 150, "alphabets")),
      country: Joi.string().required().messages({
        "any.required": "Country field is required",
      }),
      state: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages(stringMessage("State", 1, 50)),
      zipcode: Joi.string().required(), ////to validate, verify using module
      pre_address1: Joi.string()
        .max(100)
        .required()
        .messages(stringMessage("Pre Address", 0, 100)),
      pre_address2: Joi.string()
        .max(100)
        .allow(null)
        .messages(stringMessage("Pre Address", 0, 100)),
      pre_city: Joi.string()
        .min(1)
        .max(150)
        .required()
        .regex(/^[a-zA-Z\s]{1,150}$/)
        .messages(stringMessage("City", 1, 150, "alphabets"))
        .message({ "string.pattern.base": `Pre City must contain alphabets` }),
      pre_country: Joi.string()
        .min(2)
        .max(2)
        .required()
        .messages({ "any.required": "Pre country field is required" }),
      pre_state: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages(stringMessage("Pre State", 1, 50)),
      pre_zipcode: Joi.string().required(), //// to validate and verify using module
      joined_date: Joi.date().allow(null).messages({
        "date.base":
          "Please enter a valid date in DD-MM-YYYY or YYYY-MM-DD format",
      }),
      supervisor: Joi.number()
        .allow(null)
        .label("reports to")
        .messages(numMessage("Supervisor")),
      present_and_permanent_addres_same: Joi.boolean().messages({
        "boolean.base": "This field has to be a boolean type",
      }),
      is_reporting_manager: Joi.boolean().messages({
        "boolean.base": "This field has to be a boolean type",
      }),
    }),
  },

  /**Sanjeev Gunasekaran 200089 update validate changes @public*/
  update: {
    body: Joi.object({
      first_name: Joi.string()
        .min(1)
        .max(128)
        .required()
        .regex(/^[a-zA-Z\s]{1,128}$/)
        .messages(stringMessage("First Name", 1, 128, "alphabets")),
      middle_name: Joi.string()
        .min(1)
        .max(128)
        .regex(/^[a-zA-Z\s]{1,128}$/)
        .allow(null)
        .allow("")
        .messages(stringMessage("Middle name", 1, 128, "alphabets")),
      last_name: Joi.string()
        .min(1)
        .max(128)
        .regex(/^[a-zA-Z\s]{1,128}$/)
        .message(stringMessage("Last Name", 1, 128, "alphabets")),
      work_phone: Joi.string().custom((numb, helper) => {
        if (!phone(numb).isValid) {
          return helper.message(`The phone number you have entered is invalid`);
        } else {
          return true;
        }
      }),
      work_email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com"] },
        })
        .required()
        .messages(stringMessage("Work Email")), //allow bassure val
      private_email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com"] },
        })
        .messages(stringMessage("Private Email")),
      designation: Joi.number().allow(null).messages(numMessage("Designation")),
      department: Joi.number().allow(null).messages(numMessage("Department")), //// integer or string?
      gender: Joi.valid("Male", "Female", "Transgender")
        .required()
        .label("Gender")
        .messages(stringMessage("Gender")),
      birthday: Joi.date().required().messages({
        "date.base":
          "Please enter a valid date in DD-MM-YYYY or YYYY-MM-DD format",
      }),
      marital_status: Joi.valid(
        "Married",
        "Single",
        "Divorced",
        "Widowed",
        "Other"
      )
        .required()
        .label("Marital status")
        .messages(stringMessage("Marital status")),
      blood_group: Joi.valid(
        "O -",
        "O +",
        "A -",
        "A +",
        "B -",
        "B +",
        "AB -",
        "AB +"
      )
        .required()
        .label("Blood group")
        .messages(stringMessage("Blood group")),
      status: Joi.string()
        .valid("Active", "Long absence", "Terminated", "Deceased", "Resigned")
        .label("Status")
        .messages(stringMessage("Status")),
      native_state: Joi.string()
        .allow(null)
        .messages(stringMessage("Native state")),
      height: Joi.number()
        .allow(null)
        .min(70)
        .max(240)
        .messages(numMessage("Height", `${70}cm`, `${240}cm`)), ///too personal
      weight: Joi.number()
        .allow(null)
        .min(40)
        .max(150)
        .messages(numMessage("Weight", `${40}kg`, `${150}kg`)), ///too personal
      religion: Joi.valid(
        "Hinduism",
        "Buddhism",
        "Sikhism",
        "Jainism",
        "Taoism",
        "Confucianism",
        `Bahá'í`,
        "Shinto",
        "Zoroastrianism",
        "Judaism",
        "Christianity",
        "Islam",
        "Atheism",
        "Rationalism",
        "Agnosticism",
        "Scepticism",
        "Freethinker",
        "Humanism"
      )
        .required()
        .label("Religion")
        .messages(stringMessage("Religion")),
      nationality: Joi.string()
        .required()
        .min(3)
        .max(3)
        .regex(/^[A-Z\s]{3,3}$/)
        .messages(
          stringMessage(
            "Nationality",
            3,
            3,
            "uppercase alphabets (no numbers or special characters)"
          )
        ), ////verify

      aadhar_number: Joi.string()
        // .regex(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)
        .required()
        .messages({
          "string.pattern.base": "Aadhar number you've entered is invalid",
        }), ////verify

      pan_number: Joi.string()
        .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
        .allow(null)
        .messages({
          "string.pattern.base": "Please enter a valid PAN number",
        }), /////verify
      // passport_num: Joi.string()
      //   .max(100)
      //   .regex(/^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/)
      //   .allow(null)
      //   .messages({
      //     "string.pattern.base": "Please enter a valid passport number",
      //   }), ///verify
      address1: Joi.string()
        .max(100)
        .required()
        .messages(stringMessage("Address", 0, 100)),
      address2: Joi.string()
        .max(100)
        .allow(null)
        .messages(stringMessage("Address", 0, 100)),
      city: Joi.string()
        .min(1)
        .max(150)
        .required(),
        // .regex(/^[a-zA-Z\s]{1,150}$/)
        // .messages(stringMessage("City", 0, 150, "alphabets"))
      country: Joi.string().required().messages({
        "any.required": "Country field is required",
      }),
      state: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages(stringMessage("State", 1, 50)),
      zipcode: Joi.string().required(), ////to validate, verify using module
      pre_address1: Joi.string()
        .max(100)
        .required()
        .messages(stringMessage("Pre Address", 0, 100)),
      pre_address2: Joi.string()
        .max(100)
        .allow(null)
        .messages(stringMessage("Pre Address", 0, 100)),
      pre_city: Joi.string()
        .min(1)
        .max(150)
        .required(),
        // .regex(/^[a-zA-Z\s]{1,150}$/)
        // .messages(stringMessage("City", 1, 150, "alphabets"))
        // .message({ "string.pattern.base": `Pre City must contain alphabets` }),
      pre_country: Joi.string()
        .min(2)
        .max(2)
        .required()
        .messages({ "any.required": "Pre country field is required" }),
      pre_state: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages(stringMessage("Pre State", 1, 50)),
      pre_zipcode: Joi.string().required(), //// to validate and verify using module
      joined_date: Joi.date().allow(null).messages({
        "date.base":
          "Please enter a valid date in DD-MM-YYYY or YYYY-MM-DD format",
      }),
      supervisor: Joi.number()
        .allow(null)
        .label("reports to")
        .messages(numMessage("Supervisor")),
      present_and_permanent_addres_same: Joi.boolean().messages({
        "boolean.base": "This field has to be a boolean type",
      }),
      is_reporting_manager: Joi.boolean().messages({
        "boolean.base": "This field has to be a boolean type",
      }),
    }),
    query: Joi.object({
      id: Joi.number()
        .required()
        .messages({ "number.base": "Query Id is required" }),
    }),
  },

  bulkCreate: {
    body: Joi.object({
      // employee_id: Joi.string().required().regex(/^[2]([0-9]{5})$/).custom(isValidEmployeeID,"custom validation for Employee Id").required().messages({
      //     "string.pattern.base":"Employee Code should: \nMust start with 2 \nHave only numbers \nNo characters \nAnd have only 6 digits "
      // }).label('Employee Code'),
      employee_id: Joi.string()
        .required()
        .custom((value, helper) => {
          if (value.length != 6) {
            return helper.message("Employee code length must be 6 digits");
          } else if (value.charAt(0) != "2") {
            return helper.message("Employee code should start with 2");
          } else if (value.match(/^[0-9]+$/) == null) {
            return helper.message("Employee code should be only in numbers");
          }
        })
        .label("Employee Code"),
      first_name: Joi.string().max(128).required().label("First Name"),
      last_name: Joi.string().max(128).required().label("Last Name"),
      work_phone: Joi.string().min(10).max(12).required().label("Phone Number"),
      work_email: Joi.string()
        .regex(/^[A-Za-z0-9._%+-]+@bassure.com$/)
        .required()
        .messages({
          "string.pattern.base": "Email should have a domain name 'bassure'...",
        })
        .label("Office Email Id"),
      status: Joi.string()
        .valid("Active", "Long absence", "Terminated", "Deceased", "Resigned")
        .label("Status"),
    }),
  },

  /**Sanjeev Gunasekaran 200089 @public*/
  getById: {
    query: Joi.object({
      id: Joi.number()
        .required()
        .messages({ "number.base": "Query Id is required" }),
    }),
  },

  /**Sanjeev Gunasekaran 200089 @public*/
  delete: {
    query: Joi.object({
      id: Joi.number()
        .required()
        .messages({ "number.base": "Query Id is required" }),
    }),
  },
};
