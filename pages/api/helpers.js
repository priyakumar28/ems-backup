const formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var handlebars = require("handlebars");
const cryptoJS = require("crypto-js");

export const generateMailContent = (templatePath, mailContentData) => {
  const source = require(`./template/${templatePath}`);
  const template = handlebars.compile(source);
  return template(mailContentData);
};

export const parseRequestFiles = async (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export const convertToMB = (sizeInBytes) => {
  return sizeInBytes / (1024 * 1024);
};

export const ALLOWED_PROFILE_PIC_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
];

export const ALLOWED_PROFILE_SIZE = 2; // MB

export const ALLOWED_EMP_DOC_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
];

export const ALLOWED_EMPER_DOC_TYPES = ["application/pdf"];

export const ALLOWED_EMPER_DOC_SIZE = 1; // MB

export const ALLOWED_EMP_DOC_SIZE = 10; // MB

export const ALLOWED_CERITIFICATION_TYPES = ["application/pdf"];

export const ALLOWED_CERITIFICATION_SIZE = 1; // MB

export const ALLOWED_CANCELLED_CHEQUE_LEAF_TYPES = [
  "image/jpg",
  "image/png",
  "image/jpeg"
];

export const ALLOWED_CANCELLED_CHEQUE_LEAF_SIZE = 0.2; // MB

export const ALLOWED_FAVICON_TYPES = ["image/vnd.microsoft.icon"];

export const ALLOWED_FAVICON_SIZE = 2; // MB

export const ALLOWED_LOGO_TYPES = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/svg+xml",
];

export const ALLOWED_LOGO_SIZE = 0.5; // MB

export const EmpDHC = {
  emp_create: "EMPLOYEE CREATED",
  emp_update: "EMPLOYEE UPDATED",
  emp_delete: "EMPLOYEE DELETED",

  pro_create: "PROJECT CREATED",
  pro_update: "PROJECT UPDATED",
  pro_delete: "PROJECT DELETED",

  nom_create: "NOMINEE DETAILS CREATED",
  nom_update: "NOMINEE DETAILS UPDATED",
  nom_delete: "NOMINEE DETAILS DELETED",

  courses_create: "COURSES CREATED",
  courses_delete: "COURSES DELETED",
  courses_update: "COURSES UPDATED",

  bank_create: "BANK DETAILS CREATED",
  bank_update: "BANK DETAILS UPDATED",
  bank_delete: "BANK DETAILS DELETED",

  educations_create: "EDUCATIONS CREATED",
  educations_updated: "EDUCATIONS UPDATED",
  educations_delete: "EDUCATIONS DELETED",

  documents_create: "DOCUMENT CREATED",
  documents_update: "DOCUMENT UPDATED",
  documents_delete: "DOCUMENT DELETE",

  emergencycontact_create: "EMERGENCY CONTACTS CREATED",
  emergencycontact_delete: "EMERGENCY CONTACTS DELETED",
  emergencycontact_update: "EMERGENCY CONTACS UPDATED",

  emppro_delete: "EMPLOYEE PROJECTS DELETED",
  emppro_create: "EMPLOYEE PROJECTS CREATED",
  emppro_update: "EMPLOYEE PROJECTS UPDATED",

  employmenthistory_create: "EMPLOYEMENT HISTORY CREATED",
  employmenthistory_delete: "EMPLOYEMENT HISTORY DELETED",
  employmenthistory_update: "EMPLOYEMENT HISTORY UPDATED",

  emptrasess_create: "EMPLOYEE TRAINING SESSIONS CREATED",
  emptrasess_delete: "EMPLOYEE TRAINING SESSIONS DELETED",
  emptrasess_update: "EMPLOYEE TRAINING SESSIONS UPDATED",

  empcertif_create: "EMPLOYEE CERTIFICATION CREATED",
  empcertif_delete: "EMPLOYEE CERTIFICATION DELETED",
  empcertif_update: "EMPLOYEE CERTIFICATION UPDATED",

  timeentry_create: "EMPLOYEE TIMEENTRY CREATED",
  timeentry_update: "EMPLOYEE TIMEENTRY UPDATED",
  timeentry_delete: "EMPLOYEE TIMEENTRY DELETED",
};

export const response = (code, message, data = null) => {
  return { code, message, data };
};

export const encrypt = (message) => {
  return cryptoJS.AES.encrypt(message, process.env.EMS_APP_SECRET).toString();
}

export const decrypt = (ciphertext) => {
  let bytes = cryptoJS.AES.decrypt(ciphertext, process.env.EMS_APP_SECRET);
  return bytes.toString(cryptoJS.enc.Utf8);
}