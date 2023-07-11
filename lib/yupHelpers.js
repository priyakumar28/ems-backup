const moment = require("moment");
const validator = require("validator");
const phone = require("yup-phone");
const { isValidURL } = require("./helpers");
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function isValidEmailDomain(companyNameArr) {
  let message = `Domain should be ${companyNameArr.join(", ")}`;
  return this.test("isValidEmailDomain", message, function (value) {
    const { path, createError } = this;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      if (companyNameArr.includes(value.split("@")[1].split(".")[0]))
        return true;
    }

    return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
  });
}

export function isValidEnum(array, name) {
  let message = `${name} should be one of the following ${array.join(", ")}`;
  return this.test("isValidEnum", message, function (value) {
    const { path, createError } = this;

    if (!array.includes(value)) {
      return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
    }

    return true;
  });
}

export function isValidDOB() {
  let minAge = 18;
  let maxAge = 80;
  let message = `Age should be valid and between ${minAge} and ${maxAge}`;
  return this.test("isValidDOB", message, function (value) {
    const { path, createError } = this;

    let age = moment().diff(moment(value), "years");
    let isValidAge = age >= minAge && age <= maxAge;
    if (isValidAge) return true;

    return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
  });
}

export function isValidPattern(regex, name) {
  let message = `${name} should be valid`;
  return this.test("isValidPattern", message, function (value) {
    const { path, createError } = this;

    if (value) {
      if (regex.test(value)) return true;
      return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
    } else {
      return true;
    }
  });
}

export function isValidPassport(countryCode) {
  let message = `Not a valid passport number`;
  return this.test("isValidPassport", message, function (value) {
    const { path, createError } = this;

    if (value) {
      if (validator.isPassportNumber(value, countryCode)) return true;
      return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
    }

    return true;
  });
}

export function isBetweenMinMax(name, min, max) {
  let message = `${name} should between ${min} and ${max}`;
  return this.test("isBetweenMinMax", message, function (value) {
    const { path, createError } = this;

    if (!value || (value >= min && value <= max)) return true;
    return createError({ path, message: message ?? REQUIRED_ERROR_MESSAGE });
  });
}

yup.addMethod(yup.mixed, "isValidEmailDomain", isValidEmailDomain);
yup.addMethod(yup.mixed, "isValidEnum", isValidEnum);
yup.addMethod(yup.mixed, "isValidPattern", isValidPattern);
yup.addMethod(yup.mixed, "isValidPassport", isValidPassport);
yup.addMethod(yup.mixed, "isBetweenMinMax", isBetweenMinMax);
yup.addMethod(yup.mixed, "isValidDOB", isValidDOB);

export const profileSchema = {
  first_name: yup
    .string()
    .required()
    .max(32)
    .matches(
      /^[a-zA-Z\s]{0,32}$/,
      "First Name is required and must contain alphabets"
    )
    .label("First name"),
  middle_name: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z\s]{0,32}$/, "Middle Name must contain alphabets")
    .label("Middle name"),
  last_name: yup
    .string()
    .required()
    .max(32)
    .matches(
      /^[a-zA-Z\s]{0,32}$/,
      "Last Name is required and must contain alphabets"
    )
    .label("Last name"),
  work_phone: yup.string().required().label("phone number"), //
  home_phone: yup.string().label("Phone number"),
  work_email: yup
    .string()
    .required()
    .email()
    .isValidEmailDomain(["bassure"])
    .label("Email"),
  private_email: yup.string().email().nullable().label("PersonalEmail"),
  gender: yup
    .string()
    .required()
    .isValidEnum(["Male", "Female", "Transgender"], "Gender")
    .label("Gender"),
  birthday: yup
    .date()
    .nullable()
    .required("DOB is Required")
    .test("DOB", "Please choose a valid date of birth", (value) => {
      return moment().isValid(value);
    })
    .isValidDOB()
    .label("DOB"),
  marital_status: yup
    .string()
    .required()
    .isValidEnum(
      ["Married", "Single", "Divorced", "Widowed", "Other"],
      "Marital status"
    )
    .label("Marital status"),
  pre_address1: yup.string().required().label("Address line 1"),
  pre_address2: yup.string().nullable().label("Address line 2"),
  pre_city: yup.string().required().label("City"),
  pre_country: yup.string().required().label("Country"),
  pre_state: yup.string().required().label("State"),
  pre_zipcode: yup.string().required().label("Zip Code"),
  nationality: yup.string().required().label("Nationality"),
};

export const employeeSchema = {
  first_name: yup
    .string()
    .required()
    .max(32)
    .matches(
      /^[a-zA-Z\s]{0,32}$/,
      "First Name is required and must contain alphabets"
    )
    .label("First Name"),
  middle_name: yup
    .string()
    .nullable()
    .max(32)
    .matches(/^[a-zA-Z\s]{0,32}$/, "Middle Name must contain alphabets")
    .label("Middle name"),
  last_name: yup
    .string()
    .required()
    .max(32)
    .matches(
      /^[a-zA-Z\s]{0,32}$/,
      "Last Name is required and must contain alphabets"
    )
    .label("Last name"),
  work_phone: yup.string().required().label("Phone number"), //phone module
  home_phone: yup.string().label("Phone number"),
  work_email: yup
    .string()
    .required()
    .email()
    .isValidEmailDomain(["bassure"])
    .label("Email"),
  gender: yup
    .string()
    .required()
    .isValidEnum(["Male", "Female", "Transgender"], "Gender")
    .label("Gender"),
  birthday: yup
    .date()
    .nullable()
    .required("DOB is Required")
    .test("DOB", "Please choose a valid date of birth", (value) => {
      return moment().isValid(value);
    })
    .isValidDOB()
    .label("DOB"),
  marital_status: yup
    .string()
    .required()
    .isValidEnum(
      ["Married", "Single", "Divorced", "Widowed", "Other"],
      "Marital status"
    )
    .label("Marital status"),
  height: yup
    .string()
    .nullable()
    .isBetweenMinMax("Height", 120, 240)
    .label("Height"),
  weight: yup
    .string()
    .nullable()
    .isBetweenMinMax("Weight", 40, 150)
    .label("Weight"),
  blood_group: yup
    .string()
    .required()
    .isValidEnum(
      ["O -", "O +", "A -", "A +", "B -", "B +", "AB -", "AB +"],
      "Blood group"
    )
    .label("Blood group"),
  religion: yup
    .string()
    .required()
    .isValidEnum(
      [
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
        "Humanism",
        "Not to disclose"
      ],
      "Religion"
    )
    .label("Religion"),
  nationality: yup.string().required().label("Nationality"),
  aadhar_number: yup
    .string()
    .transform((v) => v?.split(" ").join(""))
    .required()
    .label("Aadhaar Number"),
  pan_number: yup
    .string()
    .isValidPattern(/^([a-zA-Z]){5}(\d){4}([a-zA-Z]){1}$/, "Pancard")
    .nullable()
    .label("Pancard"),
  // passport_num: yup
  //   .string()
  //   .nullable()
  //   .isValidPassport("IN")
  //   .label("Passport number"),
  address1: yup.string().required().label("Address line 1"),
  address2: yup.string().nullable().label("Address line 2"),
  city: yup
    .string()
    .required(),
    // .matches(
    //   /^[a-zA-Z\s]{1,32}$/,
    //   "City is required and must contain alphabets"
    // ),
  country: yup.string().required().label("Country"),
  state: yup.string().required().label("State"),
  zipcode: yup.string().required().label("Zip Code"),
  pre_address1: yup.string().required().label("Present Address line 1"),
  pre_address2: yup.string().nullable().label("Present Address line 2"),
  pre_city: yup
    .string()
    .required()
    // .matches(
    //   /^[a-zA-Z\s]{3,32}$/,
    //   "Present City is required and must contain alphabets"
    // )
    .label("City"),
  pre_country: yup.string().required().label("Present Country"),
  pre_state: yup.string().required().label("Present State"),
  pre_zipcode: yup.string().required().label("Present Zip Code"),
  joined_date: yup.date().nullable().label("Present Joined date"),
  supervisor: yup
    .number()
    .transform((v) => (v === "" || Number.isNaN(v) ? null : v))
    .nullable()
    .typeError("Select reporting manager")
    .label("Report to"),
  department: yup
    .number()
    .transform((v) => (v === "" || Number.isNaN(v) ? null : v))
    .nullable()
    .label("Department"),
  designation: yup
    .number()
    .transform((v) => (v === "" || Number.isNaN(v) ? null : v))
    .nullable()
    .label("Designation"),
  present_and_permanent_addres_same: yup.boolean(),
  is_reporting_manager: yup.boolean(),
};

export const employmentHistorySchema = {
  employer_name: yup
    .string()
    .required()
    .max(32)
    .matches(
      /^[a-zA-Z\s]{1,32}$/,
      "Company name is required and must contain alphabets"
    )
    .label("Company name"),
  date_start: yup
    .date()
    .nullable()
    .required("Employment period is Required")
    .test("Start_date", "Please choose a valid employment period", (value) => {
      return moment().isValid(value);
    })
    .label("Start date"),
  date_end: yup
    .date()
    .nullable()
    .required("Employment period is Required")
    .min(yup.ref("date_start"), "End date can't be before start date")
    .test("End_date", "Please choose a valid employment period", (value) => {
      return moment().isValid(value);
    })
    .label("End date"),
  job_title: yup
    .string()
    .nullable()
    .max(32)
    .matches(
      /^[a-zA-Z\s]{1,32}$/,
      "Job title is required and must contain alphabets"
    )
    .label("Job title"),
  employment_type: yup.string().nullable().max(32).label("Employment type"),
  payroll_type: yup.string().nullable().max(32).label("Payroll type"),
  payroll_amount: yup.string().nullable().label("Payroll amount"),
  reason_for_leaving: yup
    .string()
    .nullable()
    .max(400)
    .label("Reason for leaving"),
  reference_name: yup
    .string()
    .nullable()
    .max(32)
    .matches(
      /^[a-z A-z]{3,32}$/,
      "Reference name is required and must contain alphabets"
    )
    .label("Reference name"),
  reference_phno: yup
    .string()
    .nullable()
    .min(10)
    .max(12)
    .label("Reference phone no"),
  attachment: yup
    .mixed()
    .transform((v) =>
      (typeof v == "object" && v != null && Object.entries(v)?.length > 0) || isValidURL(v)
        ? v
        : null
    ),
};

export const courseSchema = {
  code: yup.string().required().min(3).max(16).label("Code"),
  name: yup.string().required().min(6).max(64).label("Name"),
  description: yup.string().nullable().max(400).label("Description"),
  coordinator: yup
    .number()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .nullable()
    .typeError("Select coordinator")
    .label("Coordinator"),
    trainer_from: yup
    .string()
    .isValidEnum(["Internal", "External"], "Trainer_from")
    .label("Trainer_from"),
  trainer: yup.string().nullable().max(32).label("Trainer name"),
  contact_number: yup.string().phone().label("Contact Number"),
  contact_mail: yup.string().max(100).label("Contact Email"),
  trainer_info: yup.string().nullable().label("Trainer information"),
  // paymenttype: yup
  //   .string()
  //   .isValidEnum(["Company Sponsored", "Paid by Employee"], "Payment type")
  //   .label("Payment type"),
  // cost: yup
  //   .number()
  //   .transform((v) => (v === "" || Number.isNaN(v) ? null : v))
  //   .nullable()
  //   .typeError("Enter valid amount")
  //   .label("Cost"),

  cost_code:yup
  .string()
  .min(5)
  .max(30)
  .label("Cost Code"),
  status: yup
    .string()
    .isValidEnum(["Active", "Inactive"], "Status")
    .label("Status"),
};

export const departmentSchema = {
  code: yup.string().required().min(3).max(16).label("Code"),
  name: yup.string().required().min(1).max(64).label("Name"),
  description: yup.string().nullable().max(400).label("Description"),
};

export const designationSchema = {
  code: yup.string().required().min(3).max(16).label("Code"),
  name: yup.string().required().min(1).max(64).label("Name"),
  description: yup.string().nullable().max(400).label("Description"),
  department: yup
    .number()
    .required()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .label("Designation"),
};

export const emergencyContactsSchema = {
  employee: yup.number().nullable().label("Employee"),
  name: yup
    .string()
    .required()
    .max(100)
    .matches(/^[a-zA-Z\s]{1,100}$/, "Name must contain alphabets only")
    .label("Name"),
  relationship: yup
    .string()
    .isValidEnum(
      ["Father", "Mother", "Wife", "Brother", "Sister"],
      "Relationship"
    )
    .label("Relationship"),
  work_phone: yup.string().min(7).max(15).label("Work Phone number"),
  home_phone: yup.string().required().min(7).max(15).label("Home Phone number"),
};

export const projectSchema = {
  name: yup.string().required().min(3).max(32).label("Name"),
  client: yup
    .number()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .typeError("Select client")
    .label("Client"),
  details: yup.string().required().min(3).max(322).label("Details"),
  // created: yup.date().required().label("Created"),
  start_date: yup.date().required().label("Start Date"),
  end_date: yup.date().required().label("End Date"),
  status: yup
    .string()
    .max(64)
    .isValidEnum(["Active", "On Hold", "Completed", "Dropped"])
    .label("Status"),
};

export const trainingSessionSchema = {
  name: yup.string().required().min(3).max(32).label("Name"),
  course: yup
    .number()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .typeError("Select course")
    .label("Course"),
  description: yup.string().nullable().max(400).label("Description"),
  scheduled: yup
    .date()
    .nullable()
    .test(
      "Scheduled_Date",
      "Please choose a valid scheduled period",
      (value) => {
        return moment().isValid(value);
      }
    )
    .label("Scheduled date"),
  duedate: yup
    .date()
    .nullable()
    .min(yup.ref("scheduled"), "Due date can't be before scheduled date")
    .test("Due_Date", "Please choose a valid due period", (value) => {
      return moment().isValid(value);
    })
    .label("Due date"),
  deliverymethod: yup
    .string()
    .isValidEnum(["Classroom", "Self Study", "Online"], "Session method")
    .label("Session method"),
  deliverylocation: yup.string().nullable().max(400).label("Session location"),
  status: yup
    .string()
    .isValidEnum(["Pending", "Approved", "Completed", "Cancelled"], "Status")
    .label("Status"),
};

export const employeeTrainingSessionSchema = {
  trainingsession: yup
    .number()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .typeError("Select session")
    .required()
    .label("Session"),
  feedback: yup.string().nullable().min(5).max(1500).label("Feedback"),
  status: yup
    .string()
    .isValidEnum(
      ["Scheduled", "Attended", "Not-Attended", "Completed"],
      "Status"
    )
    .label("Status"),
};

export const employeeCertificationSchema = {
  certification_name: yup.string().required().max(64).label("Certification"),
  institute: yup.string().required().max(64).label("Institute"),
  date_start: yup
    .date()
    .nullable()
    .test("Start_date", "Please choose a valid start date", (value) => {
      return moment().isValid(value);
    })
    .label("Start date"),
  date_end: yup
    .date()
    .nullable()
    .min(yup.ref("date_start"), "End date can't be before start date")
    .test("End_date", "Please choose a valid end date", (value) => {
      return moment().isValid(value);
    })
    .label("End date"),
};

export const employeeEducationSchema = {
  employee: yup.number().nullable().label("Employee"),
  education_name: yup
    .string()
    .matches(
      /^[a-zA-Z\s]{1,64}$/,
      `Education name required & contain alphabets only`
    )
    .required()
    .max(64)
    .label("Education"),
  institute: yup
    .string()
    .matches(
      /^[a-zA-Z\s]{1,64}$/,
      `Institute name required & contain alphabets only`
    )
    .required()
    .max(64)
    .label("Institute"),
  date_start: yup
    .date()
    .nullable()
    .required()
    .test("Start_date", "Please choose a valid start date", (value) => {
      return moment().isValid(value);
    })
    .label("Start date"),
  date_end: yup
    .date()
    .nullable()
    .required()
    .min(yup.ref("date_start"), "End date can't be before start date")
    .test("End_date", "Please choose a valid end date", (value) => {
      return moment().isValid(value);
    })
    .label("End date"),
  attachment: yup
    .mixed()
    .transform((v) =>
      (typeof v == "object" && v != null && Object.entries(v)?.length > 0) || isValidURL(v)
        ? v
        : null
    )
};

export const employeeSkillSchema = {
  skill_name: yup
    .string()
    .min(2)
    .max(32)
    .matches(
      /^[a-zA-Z\s]{2,32}$/,
      "Skill/certification name must contain alphabets & required field"
    )
    .required()
    .max(64)
    .label("Name"),
  is_certified: yup
    .string()
    .isValidEnum(["Yes", "No"], "Is certified")
    .label("Is certified"),
  attachment: yup
    .mixed()
    .transform((v) => {
      if (v) {
        return (typeof v == "object" && v != null && Object.entries(v)?.length > 0) ||
          isValidURL(v)
          ? v
          : null;
      }
      return null;
    })
    .nullable()
    .when("is_certified", (is_certified) => {
      if (is_certified == "Yes") {
        return yup
          .mixed()
          .transform((v) => {
            if (v) {
              return (typeof v == "object" && v != null && Object.entries(v)?.length > 0) ||
                isValidURL(v)
                ? v
                : null;
            }
            return null;
          })
          .required("Attachment is required");
      }
    }),
  date_start: yup
    .date()
    .nullable()
    .test("Valid_from", "Please choose a valid start", (value) => {
      return moment().isValid(value);
    })
    .label("Valid from"),
  date_end: yup
    .date()
    .nullable()
    .min(
      yup.ref("date_start"),
      "Valid through date can't be before valid from date"
    )
    .test("Valid_through", "Please choose a valid", (value) => {
      return moment().isValid(value);
    })
    .label("Valid through"),
  details: yup
    .string()
    .transform((v) => (v?.trim() == "" || v?.trim() == "null" ? null : v))
    .nullable()
    .min(3)
    .max(250)
    .label("Details"),
};

export const bankDetailsSchema = {
  account_type: yup
    .string()
    .isValidEnum(["Personal", "Salaried"], "Account Type")
    .label("Account Type"),
  bank_name: yup
    .string()
    .max(64)
    .label("Bank Name"),
  branch: yup
    .string()
    .max(32)
    .label("Branch"),
  account_number: yup
    .string()
    .max(18)
    .label("Account Number"),
  ifsc: yup
    .string()
    .max(16)
    .label("IFSC"),
  status: yup
    .string()
    .isValidEnum(["Pending", "Approved", "Rejected"], "Status")
    .label("Status"),
  reason_for_rejection: yup
    .string()
    .when('status', (status) => {
      if (status == "Rejected") {
        return yup.string().required().min(3).max(50).label("Reason for rejection")
      } else {
        return yup.string().nullable(true).label("Reason for rejection")
      }
    }),
  attachment: yup
    .mixed()
    .transform((v) =>
      (typeof v == "object" && v != null && Object.entries(v)?.length > 0) || isValidURL(v)
        ? v
        : null
    )
    .required("Attachment is required"),
  // employee:yup.number().label("Employee")
};

export const employerDocumentsSchema = {
  doc_type: yup
    .string()
    .isValidEnum(["HR assessment forms", "L1 assessment forms", "REX approval forms"], "Document Type")
    .label("Document Type"),
  employee: yup.number().required().label("Employee"),
  level: yup.number().required().label("Level"),
  document: yup
    .mixed()
    .transform((v) =>
      (typeof v == "object" && v != null && Object.entries(v)?.length > 0) || isValidURL(v)
        ? v
        : null
    )
    .required("Document is required"),
};

export const siteSettingsSchema = {
  users: yup
    .number()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .typeError("Selectusers")
    .label("Users"),
  site_title: yup.string().required().min(2).max(32).label("Site title"),
  favicon: yup
    .mixed()
    .transform((v) => {
      if (v) {
        return (typeof v == "object" && v != null && Object.entries(v)?.length > 0) ||
          isValidURL(v)
          ? v
          : null;
      }
      return null;
    })
    .nullable()
    .label("Favicon"),
  logo: yup
    .mixed()
    .transform((v) => {
      if (v) {
        return (typeof v == "object" && v != null && Object.entries(v)?.length > 0) ||
          isValidURL(v)
          ? v
          : null;
      }
      return null;
    })
    .nullable()
    .label("Logo"),
  about_us: yup.string().required().min(50).max(250).label("About us"),
  theme_mode: yup
    .string()
    .required()
    .isValidEnum(["light", "dark"], "Theme mode")
    .label("Theme mode"),
};

export const configurationSettingsSchema = {
  // users: yup
  // .number()
  // .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
  // .typeError("Selectusers")
  // .label("Users"),
  pancard_upload_max_days: yup
    .number()
    .required()
    .min(5)
    .max(20)
    .label("PAN card configuration"),
  change: yup.boolean().label("Email trigger option"),
};

export const employerdocumentssettingsSchema = {
  hr_assessment_password: yup.string().required(),
  l1_assessment_password: yup.string().required(),
  rex_approval_password: yup.string().required(),
};

export const bulkEmployeeSchema = yup.object().shape({
  employee_id: yup.string().required(),
  first_name: yup.string().required().max(32).label("First name"),
  last_name: yup.string().required().max(32).label("Last name"),
  work_phone: yup.string().required().min(10).max(12).label("Phone number"),
  work_email: yup
    .string()
    .required()
    .email()
    .isValidEmailDomain(["bassure"])
    .label("Email"),
  status: yup
    .string()
    .required()
    .isValidEnum(
      ["Active", "Terminated", "Deceased", "Long absence", "Resigned"],
      "status"
    )
    .label("status"),
});

export const nomineedetailsSchema = {
  // employee: yup.number().label("Employee"),
  name: yup
    .string()
    .matches(
      /^[a-zA-Z\s]{1,100}$/,
      `Name is required and must contain alphabets only`
    )
    .required()
    .label("Name"),
  state: yup
    .string()
    .matches(
      /^[a-zA-Z\s]{1,70}$/,
      `State is required and must contain alphabets only`
    )
    .required()
    .label("State"),
  district: yup
    .string()
    .matches(
      /^[a-zA-Z\s]{1,70}$/,
      `District is required and must contain alphabets only`
    )
    .required()
    .label("District"),
  address_pincode: yup
    .string()
    .matches(
      /^[0-9a-zA-Z\s-_,:]{1,200}$/,
      `Adress&Pincode is required and must contain alphabets only`
    )
    .required()
    .max(200)
    .label("Address and pincode"),
  phone: yup.string().required().max(15).label("Phone"),
  relationship: yup
    .string()
    .required()
    .isValidEnum([
      "Father",
      "Mother",
      "Uncle",
      "Aunt",
      "Guardian",
      "Grandfather",
      "Grandmother",
    ]),
};

export const clientdetailsSchema = {
  name: yup.string().required().max(100).label("Name"),
  details: yup.string().nullable().max(1000).label("Details"),
  first_contact_date: yup.date().label("First Contact Date"),
  address: yup.string().nullable().max(1000).label("Address"),
  contact_number: yup.string().phone().label("Contact Number"),
  contact_email: yup.string().max(100).label("Contact Email"),
  company_url: yup
    .string()
    // .matches(
    //   new RegExp(
    //     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    //   )
    // )

    .required()
    .max(500)
    .label("Company URL"),
  status: yup.string().isValidEnum(["Active", "Inactive"]).label("Status"),
};

export const employeetimeentrySchema = {
  project: yup.number().label("Project"),
  // employee: yup.number().required().label("Employee"),
  //timesheet: yup.number().required().label("Timesheet"),
  details: yup.string().nullable().max(1000).label("Details"),
  // //created: yup.date().label("created"),
  // date_start: yup.date().label("Start Date"),
  time_start: yup.string().required().label("Time Start"),
  // date_end: yup.date().label("End Date"),
  time_end: yup.string().required().label("Time End"),
  //status: yup.string().isValidEnum(["Active", "Inactive"]).label("Status"),
};

export const timesheetSchema = {
  // employee: yup.number().label("employee"),
  date_start: yup.date().label("date_start"),
  date_end: yup.date().label("date_end"),
  // status: yup
  //   .string()
  //   .isValidEnum(["Approved", "Pending", "Submitted", "Rejected"])
  //   .label("status"),
};

export const employeeprojectSchema = {
  employee: yup
    .number()
    .transform((v) => (v == "" || Number.isNaN(v) ? null : v))
    .typeError("Selectemployee")
    .label("Employee"),
  date_start: yup.date().required().label("Start Date"),
  date_end: yup.date().required().label("End Date"),
  details: yup.string().max(300).label("Details"),
  bill_type: yup
    .string()
    .max(64)
    .isValidEnum(["Billable", "Non Billable"])
    .label("Bill Type"),
  bill_percent: yup.number().label("Bill Percent"),
  comments: yup.string().max(300).label("Comments"),
};


