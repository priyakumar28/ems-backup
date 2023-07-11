const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
} = require("../../config/status_codes");
const {
  models: { employeeskills: Employeeskills },
} = require("../../models");
const employeeskillResources = require("../../resources/employeeskills");

const { upload } = require("../../services/upload");
const {
  ALLOWED_CERITIFICATION_TYPES,
  ALLOWED_CERITIFICATION_SIZE,
  EmpDHC,
} = require("../../helpers");
const { module_helpers } = require("../../config/module_helpers");
const { isValidURL } = require("../../../../lib/helpers");
const { eh } = require("../../config/emphistory");

let moduleCategory = {};
moduleCategory.VIEW_SKILLS_CERTIFICATIONS =
  module_helpers["Employee management"].VIEW_SKILLS_CERTIFICATIONS;
let associations = [];

// return employeeskills by his/her id by calling the employee services
exports.getById = async (id, permission) => {
  try {
    if (permission[moduleCategory.VIEW_SKILLS_CERTIFICATIONS]) {
      associations.push("employee_employee");
    }
    let employeeskillObj = await Employeeskills.findOne({
      where: { id: id },
      include: associations,
    });
    if (!employeeskillObj) {
      return response(
        BAD_REQUEST,
        "data with given id " + id + " is not found"
      );
    }

    return response(
      OK,
      "Employee skill retrived",
      employeeskillResources.transform(employeeskillObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

// Create employeeskills by calling the employeeskills services
exports.create = async (payload, usrr, permission) => {
  let a;
  try {
    if (payload.fields.is_certified == "Yes") {
      if (payload.files.attachment) {
        let file = payload.files.attachment;
        let path = `employee_skills_certificates/${payload.fields.employee}`;
        let { success, ...res } = await upload(
          file,
          path,
          ALLOWED_CERITIFICATION_TYPES,
          ALLOWED_CERITIFICATION_SIZE
        );

        if (success) {
          payload.fields.attachment = res.url;
        } else {
          return response(BAD_REQUEST, "Certificate upload error");
        }
      } else {
        return response(UNPROCESSABLE_ENTITY, "Certificate is missing");
      }
    }

    payload = payload.fields;

    let employeeskillObj = await Employeeskills.create(payload);
    a = await this.getById(employeeskillObj.id, permission);
    eh("create", usrr, EmpDHC.empcertif_create, a);
    employeeskillObj = employeeskillResources.transform(employeeskillObj);

    return response(OK, "New employeeskill created", employeeskillObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

// Update employeeskills by using their specific id's
exports.update = async (payload, id, usrr) => {
  let a, b;
  try {
    a = await Employeeskills.findOne({
      where: { id: id },
      include: "employee_employee",
    });
    if (!a) {
      return response(
        BAD_REQUEST,
        "data with given id " + id + " is not found"
      );
    }
    if (payload.fields.is_certified == "Yes" && payload.files.attachment) {
      let file = payload.files.attachment;
      let path = `employee_skills_certificates/${payload.fields.employee}`;
      let { success, ...res } = await upload(
        file,
        path,
        ALLOWED_CERITIFICATION_TYPES,
        ALLOWED_CERITIFICATION_SIZE
      );

      if (success) {
        payload.fields.attachment = res.url;
      } else {
        return response(BAD_REQUEST, "Certificate upload error");
      }
    } else if (
      payload.fields.is_certified == "Yes" &&
      !isValidURL(payload.fields.attachment)
    ) {
      return response(UNPROCESSABLE_ENTITY, "Certificate is missing");
    }

    payload = payload.fields;
    await Employeeskills.update(payload, {
      where: { id: id },
      returning: true,
    });
    b = await Employeeskills.findOne({ where: { id: id } });
    eh("update", usrr, EmpDHC.empcertif_update, a, b);
    let employeeskillObj = (await this.getById(id)).data;
    return response(OK, "Employee skill updated", employeeskillObj);
  } catch (error) {
    eh("update_failed", usrr, EmpDHC.empcertif_update, a, b);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

//get the list of employeeskills data
exports.list = async () => {
  try {
    let employeeskillAll = await Employeeskills.findAll();
    return response(
      OK,
      "Employeeskills retrived",
      employeeskillResources.transformCollection(employeeskillAll)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

//Delete the employeeskills by using their specific id's
exports.remove = async (id, employee_id, usrr) => {
  let a;
  console.log("JAAAAAAA S", employee_id);
  try {
    a = await this.getById(id);
    let employeedeleteObj = await Employeeskills.destroy({
      where: { id: id, employee: employee_id },
    });
    eh("delete", usrr, EmpDHC.empcertif_delete, a);
    return response(OK, "Employee skill deleted", employeedeleteObj);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.empcertif_delete, a);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
