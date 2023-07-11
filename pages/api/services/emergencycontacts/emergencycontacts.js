const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const {
  models: { emergencycontacts: Emergencycontacts },
} = require("../../models");

const emergencycontact = require("../../resources/emergencycontacts");
const { eh } = require("../../config/emphistory");
const { EmpDHC } = require("../../helpers");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = {};
moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES;
let associations = []

exports.getById = async (id,permission) => {
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push('employee_employee')
  }
    let emergencycontactObj = await Emergencycontacts.findOne({
      where: { id: id },
      include: associations,
    });
    return response(
      OK,
      "New emergencycontact id",
      emergencycontact.transform(emergencycontactObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload, usrr) => {
  try {

    let emergencycontactObj = await Emergencycontacts.create(payload);

    let a = await this.getById(emergencycontactObj.id);

    eh("create", usrr, EmpDHC.emergencycontact_create, a);

    return response(
      OK,
      "New emergencycontact created",
      emergencycontact.transform(emergencycontactObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, usrr,permission) => {
  let a, b;
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push('employee_employee')
    }
    a = await Emergencycontacts.findOne({
      where: { id:id, employee: payload.employee},
      include: associations,
    });
    await Emergencycontacts.update(payload, { where: { id: id } });
    b = await Emergencycontacts.findOne({ where: { id } });
    eh("update", usrr, EmpDHC.emergencycontact_update, a, b);
    let emergencycontactObj = (await this.getById(id,permission)).data;
    return response(OK, "emergencycontact updated", emergencycontactObj);
  } catch (error) {
    eh("update_failed", usrr, EmpDHC.emergencycontact_update, a, b);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (permission) => {
  try {
    if (permission[moduleCategory.VIEW_EMPLOYEES]) {
      associations.push('employee_employee')
  }
    let emergencycontactObj = await Emergencycontacts.findAll({
      include:  associations,
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "New emergencycontact list",
      emergencycontact.transformCollection(emergencycontactObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, usrr) => {
  let user;
  try {
    user = await this.getById(id);
    let emergencycontactObj = await Emergencycontacts.destroy({
      where: { id: id },
    });
    eh("delete", usrr, EmpDHC.emergencycontact_delete, user);
    return response(OK, "New emergencycontact removed", emergencycontactObj);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.emergencycontact_delete, user);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
