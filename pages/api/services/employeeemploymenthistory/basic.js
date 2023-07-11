const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require("../../config/status_codes");
const {
  models: { employeeemploymenthistory: employeeemploymenthistory },
} = require("../../models");
const employeeemploymenthistoryy = require("../../resources/employeeemploymenthistory");
const { eh } = require("../../config/emphistory");
const {
  parseRequestFiles,
  ALLOWED_EMP_DOC_TYPES,
  ALLOWED_EMP_DOC_SIZE,
  EmpDHC,
} = require("../../helpers");

const { upload } = require("../../services/upload");
const { ac } = require("../../middlewares/accesscontrol");
const requireAuth = require("../../middlewares/_requireAuth");
const { module_helpers } = require("../../config/module_helpers");
let moduleCategory = {};
moduleCategory.VIEW_EMPLOYEES =
  module_helpers["Employee management"].VIEW_EMPLOYEES;
let associations = [];

exports.getById = async (id, permission) => {
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push("employee_employee");
    }
    let employeeemploymenthistoryGetByIdObj =
      await employeeemploymenthistory.findOne({
        where: { id: id },
        include: associations,
      });
    if (!employeeemploymenthistoryGetByIdObj) {
      return response(BAD_REQUEST, `Data with given ${id} is not found`);
    }
    return response(
      OK,
      "employeeemploymenthistory retrived",
      employeeemploymenthistoryy.transform(employeeemploymenthistoryGetByIdObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload, ussr, permission) => {
  try {
    console.log("INSIDE SERVICE (HISTORY)", payload);
    if (payload.fields.is_certified == "Yes") {
      if (payload.fields.attachment) {
        let file = payload.files.attachment;
        let path = `employee_employment_history/${payload.fields.employee}`;
        let { success, ...res } = await upload(
          file,
          path,
          ALLOWED_CERTIFICATION_TYPES,
          ALLOWED_CERTIFICATION_SIZE
        );
        if (success) {
          payload.fields.attachment = res.url;
        } else {
          return response(BAD_REQUEST, "document upload error");
        }
      } else {
        return response(UNPROCESSABLE_ENTITY, "document is missing");
      }
    }

    payload = payload.fields;

    let employeeemploymenthistorycreateObj =
      await employeeemploymenthistory.create(payload);
    let a = await this.getById(
      employeeemploymenthistorycreateObj.id,
      permission
    );
    eh("create", ussr, EmpDHC.employmenthistory_create, a);
    return response(
      OK,
      "Employeement history created",
      employeeemploymenthistoryy.transform(employeeemploymenthistorycreateObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, ussr, permission) => {
  let a, b;
  try {
    a = await employeeemploymenthistory.findOne({
      where: { id, employee: payload.employee },
      include: "employee_employee",
    });
    if (!a) {
      return response(BAD_REQUEST, "data with given id is not found");
    }

    if (payload.fields.is_certified == "Yes" && payload.fields.attachment) {
      let file = payload.files.attachment;
      let path = `employee_employment_history/${payload.fields.employee}`;
      let { success, ...res } = await upload(
        file,
        path,
        ALLOWED_CERTIFICATION_TYPES,
        ALLOWED_CERTIFICATION_SIZE
      );

      if (success) {
        payload.fields.attachment = res.url;
      } else {
        return response(BAD_REQUEST, "document upload error");
      }
    } else if (
      payload.fields.is_certified == "Yes" &&
      !isValidURL(payload.fields.attachment)
    ) {
      return response(UNPROCESSABLE_ENTITY, "document is missing");
    }

      payload = payload.fields;
    await employeeemploymenthistory.update(payload, {
      where: { id: id },
      returning: true,
    });
    b = await employeeemploymenthistory.findOne({ where: { id: id } });
    eh("update", ussr, EmpDHC.employmenthistory_update, a, b);
    let employeeemploymenthistoryUpdateObj = (
      await this.getById(id, permission)
    ).data;
    return response(
      OK,
      "Employeement history updated",
      employeeemploymenthistoryUpdateObj
    );
  } catch (error) {
    eh("update_failed", ussr, EmpDHC.employmenthistory_update, a, b);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (permission) => {
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push("employee_employee");
    }
    let employeeemploymenthistorylistObj =
      await employeeemploymenthistory.findAll({
        include: associations,
        order: [["id", "DESC"]],
      });
    return response(
      OK,
      "list of employeeemployeementhistories",
      employeeemploymenthistoryy.transformCollection(
        employeeemploymenthistorylistObj
      )
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, employee_id, ussr) => {
  let a;
  try {
    a = await this.getById(id);
    let employeeemploymenthistoryRemoveIdObj =
      await employeeemploymenthistory.destroy({
        where: { id: id, employee: employee_id },
      });
    if (!employeeemploymenthistoryRemoveIdObj) {
      return response(BAD_REQUEST, "data with given id is not found");
    }
    eh("delete", ussr, EmpDHC.employmenthistory_delete, a);
    return response(
      OK,
      "Eployement history removed",
      employeeemploymenthistoryRemoveIdObj
    );
  } catch (error) {
    eh("delete_failed", ussr, EmpDHC.employmenthistory_delete, a);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
