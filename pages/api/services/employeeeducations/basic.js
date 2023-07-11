const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../../config/status_codes");
const {
  models: { employeeeducations: employeeEducations },
} = require("../../models");

const employeeeducationsresource = require("../../resources/employeeeducations");
const { eh } = require("../../config/emphistory");
const {
  parseRequestFiles,
  ALLOWED_EMP_DOC_TYPES,
  ALLOWED_EMP_DOC_SIZE,
  EmpDHC,
} = require("../../helpers");
// const emergencycontacts = require("../../models/emergencycontacts");
const { module_helpers } = require('../../config/module_helpers');
const { upload } = require("../upload");
const ObjectID = require("bson-objectid");
let moduleCategory = {};
moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES;
let associations = []

exports.getById = async (id, permission) => {
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push('employee_employee')
    }
    let employeeEducationsGetByIdObj = await employeeEducations.findOne({
      where: { id: id },
      include: associations,
    });
    if (!employeeEducationsGetByIdObj) {
      return response(BAD_REQUEST, "employee_educations not found");
    }
    return response(
      OK,
      "Education retrieved",
      employeeeducationsresource.transform(employeeEducationsGetByIdObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload, usrr, permission) => {
  try {
    let employeeEducationsObj = await employeeEducations.create(payload.fields);
    let a = await this.getById(employeeEducationsObj.id, permission);
    eh("create", usrr, EmpDHC.educations_create, a);
    // Create new employeeeducations by calling the employeeeducations services and return response
    
    return response(OK, "Employee education created", employeeEducationsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, permission, usrr) => {
  let a, b;
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push('employee_employee')
    }
    a = await employeeEducations.findOne({
      where: { id: id, employee: payload.fields.employee },
      include: associations,
    });
    if (!a) {
      return response(BAD_REQUEST, "employee_educations not found");
    }


    if (payload?.files && Object.entries(payload?.files)?.length > 0) {
      console.log("raaled")
      if (payload?.fields?.employee && payload?.files && Object.entries(payload?.files)?.length > 0) {
        let documents = a.attachment?.length > 0 ? a.attachment : [];
        let notUploadedDocuments = [];

        for (const [name, file] of Object.entries(payload.files)) {

          let path = `employeeeducationdocuments/${payload.fields.employee}`;
          let { success, ...res } = await upload(
            file,
            path,
            ALLOWED_EMP_DOC_TYPES,
            ALLOWED_EMP_DOC_SIZE,
            false
          );
          if (success) {

            documents.push({
              id: ObjectID().toHexString(),
              name: name,
              date_added: new Date(),
              attachment: res.url,
            });
          } else {
            notUploadedDocuments.push(name);
          }
        }
        payload.fields.attachment = documents;

        if (documents.length > 0) {
          let employeeEducationsobj = await employeeEducations.update(payload.fields, { where: { id: id } });;
          b = await employeeEducations.findOne({ where: { id } });
          eh("update", usrr, EmpDHC.educations_updated, a, b);
          employeeEducationsobj =
            employeeeducationsresource.transform(b);
          let message =
            notUploadedDocuments.length > 0
              ? `Few files got uploaded, whereas the following files are not, ${notUploadedDocuments.join(
                ", "
              )}`
              : "Files uploaded";
          return response(OK, message, employeeEducationsobj);
        }
        return response(NOT_FOUND, "Files not uploaded");
      } else {
        return response(UNPROCESSABLE_ENTITY, "Check file and employee exists");
      }
    }

    else {
      let message = "existing education updated";
      if (payload.fields.hasOwnProperty("removeFile")) {
        let docs = a.dataValues?.attachment?.filter((x) => {
          return x.id != payload.fields.removeFile
        });
        payload.fields.attachment = docs;
        delete payload.fields.removeFile;
        message = "selected document removed"
      }

      await employeeEducations.update(payload.fields, { where: { id: id } });
      b = await employeeEducations.findOne({ where: { id } });
      eh("update", usrr, EmpDHC.educations_updated, a, b);

      let employeeEducationsUpdateObj = (await this.getById(id, permission)).data;
      return response(
        OK,
        message,
        employeeEducationsUpdateObj
      );
    }
    
  } catch (error) {
    eh("update_failed", usrr, EmpDHC.educations_updated, a, b);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (permission) => {
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push('employee_employee')
    }
    let employeeEducationsListObj = await employeeEducations.findAll({
      include: associations,
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "list of employee educations",
      employeeeducationsresource.transformCollection(employeeEducationsListObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, usrr) => {
  let user;
  try {
    user = await this.getById(id);
    let employeeEducationsRemoveIdObj = await employeeEducations.destroy({
      where: { id: id },
    });
    if (!employeeEducationsRemoveIdObj) {
      return response(BAD_REQUEST, "employee_educations not found");
    }
    eh("delete", usrr, EmpDHC.educations_delete, user);
    return response(
      OK,
      "Education record removed",
      employeeEducationsRemoveIdObj
    );
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.educations_delete, user);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
