const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../../config/status_codes");
const {
  models: { nomineedetails: NomineeDetails },
  models,
} = require("../../models");

const {module_helpers} = require("../../config/module_helpers")
const nomineedetails = require("../../resources/nomineedetails");
const { EmpDHC } = require('../../helpers');
const { eh } = require("../../config/emphistory");

let moduleCategory = {};

moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES;
let associations = []

exports.getById = async (id) => {
  try {
    let nomineedetailsObj = await NomineeDetails.findOne({where: { id: id },include:"employee_employee"});
    if (!nomineedetailsObj) {
      return response(BAD_REQUEST, "data with given id " + id + " is not found");
  }
    return response(
      OK,
      "New nomineedetails id",
      nomineedetails.transform(nomineedetailsObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

// Create Nominee_Details

exports.create = async (payload, usrr,permission) => {
  try {
    let nomineedetailsObj = await NomineeDetails.create(payload);
    let a = await this.getById(nomineedetailsObj.id,permission);
    try {
      eh("create", usrr, EmpDHC.nom_create, a);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
    //nomineedetailsObj = nomineedetails.transform(nomineedetailsObj);
    return response(OK, "New nomineedetails created", nomineedetailsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

// Update Nominee_details

exports.update = async (payload, id, ussr) => {
  let b, a;
  try {
    b = await NomineeDetails.findOne({ where: { id,employee:payload.employee}, include: "employee_employee" });
    if (!b) {
      return response(BAD_REQUEST, "No such record existed");
    }
    await NomineeDetails.update(payload, {
      where: { id: id },
    });
    a = await NomineeDetails.findOne({ where: { id } });
    eh("update", ussr, EmpDHC.nom_update, b, a);
    let nomineedetailsObj = (await this.getById(id)).data;
    return response(OK, "New nomineedetails updated", nomineedetailsObj);
  } catch (error) {
    eh("update_failed", ussr, EmpDHC.nom_update, b, a);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let nomineedetailsObj = await NomineeDetails.findAll({
      include: ["employee_employee"],
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "New nomineedetails list",
      nomineedetails.transformCollection(nomineedetailsObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, usrr) => {
  let a
  try {
    a = await this.getById(id);
    let nomineedetailsObj = await NomineeDetails.destroy({ where: { id: id } });
    if (!nomineedetailsObj) {
      return response(BAD_REQUEST, "data with given id " + id + " is not found");
    }
      eh("delete", usrr, EmpDHC.nom_delete, a);
    return response(OK, "New nomineedetails removed", nomineedetailsObj);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.nom_delete, a)
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
