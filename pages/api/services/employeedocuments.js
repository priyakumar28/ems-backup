const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
} = require("../config/status_codes");
const {
  models: { employeedocuments: EmployeeDocuments, employees: Employees },
} = require("../models");
const employeedocumentsResource = require("../resources/employeedocuments");
const {
  parseRequestFiles,
  ALLOWED_EMP_DOC_TYPES,
  ALLOWED_EMP_DOC_SIZE,
  EmpDHC,
} = require("../helpers");
const { upload } = require("./upload");
const { ac } = require("../middlewares/accesscontrol");
const requireAuth = require("../middlewares/_requireAuth");
const { eh } = require("../config/emphistory");

exports.create = async (payload, usrr) => {
  try {

    if (
      payload?.fields?.employee &&
      payload?.files &&
      Object.entries(payload?.files)?.length > 0
    ) {
      let documents = [];
      let notUploadedDocuments = [];
      // let emp = await Employees.findOne({
      //   where: { id: payload.fields.employee },
      // });

      // let password = `${emp.first_name.slice(0, 4)}${emp.birthday.slice(8,10)}${emp.birthday.slice(5, 7)}`;

      for (const [name, file] of Object.entries(payload.files)) {

        let path = `employeedocuments/${payload.fields.employee}`;
        let { success, ...res } = await upload(
          file,
          path,
          ALLOWED_EMP_DOC_TYPES,
          ALLOWED_EMP_DOC_SIZE,
          false
        );
        if (success) {

          documents.push({
            employee: payload.fields.employee,
            approvalstatus: payload.fields.approvalstatus,
            name: name,
            date_added: new Date(),
            valid_until: new Date(),
            attachment: res.url,

          });
        } else {
          notUploadedDocuments.push(name);
        }
      }
      if (documents.length > 0) {
        let employeeDocuments = await EmployeeDocuments.bulkCreate(documents);
        let a = await this.getById(employeeDocuments[0].dataValues.id);
        eh("create", usrr, EmpDHC.documents_create, a);
        employeeDocuments =
          employeedocumentsResource.transformCollection(employeeDocuments);
        let message =
          notUploadedDocuments.length > 0
            ? `Few files got uploaded, whereas the following files are not, ${notUploadedDocuments.join(
              ", "
            )}`
            : "Files uploaded";

        return response(OK, message, employeeDocuments);
      }
      return response(NOT_FOUND, "Files not uploaded");
    } else {

      return response(UNPROCESSABLE_ENTITY, "Check file and employee exists");
    }
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, usrr) => {
  let doc;
  try {
    doc = await this.getById(id);

    let employeeDocumentsObj = await EmployeeDocuments.destroy({
      where: { id },
    });

    eh("delete", usrr, EmpDHC.documents_delete, doc);
    return response(OK, "File deleted", employeeDocumentsObj);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.documents_delete, doc);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const { number } = require("yup");
const { log } = require("handlebars/runtime");
const response = (code, message, data = {}) => {
  return { code, message, data };
};

exports.getById = async (id) => {
  try {
    let employeeDocumentsObj = await EmployeeDocuments.findOne({
      where: { id },
      include: ["document_document", "employee_employee"],
    });

    employeeDocumentsObj =
      employeedocumentsResource.transform(employeeDocumentsObj);

    return response(OK, "File found", employeeDocumentsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    let employeeDocumentsObj = await EmployeeDocuments.update(
      { approvalstatus: payload.fields.status },
      {
        where: { id, employee: payload.fields.employee },
      }
    );
    employeeDocumentsObj = await this.getById(id)
    return response(OK, "File status updated", employeeDocumentsObj);

  } catch (error) {
    // console.log(error)
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
