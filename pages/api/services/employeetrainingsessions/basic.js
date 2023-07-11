const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../../config/status_codes");
const {
  models: { employeetrainingsessions: EmployeeTrainingsessions,
    courses: Courses },
} = require("../../models");

const employeetrainingsessions_resource = require("../../resources/employeetrainingsessions");
const { eh } = require('../../config/emphistory');
const { EmpDHC } = require('../../helpers');
const trainingsessions = require("../../models/trainingsessions");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = {};
moduleCategory.VIEW_TRAINING_SESSIONS = module_helpers["Training sessions management"].VIEW_TRAINING_SESSIONS;
moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES
let associations = ['trainingsession_trainingsession', 'employee_employee']
let modulePerm = ['View training sessions', 'View employees',];
let newAssoc = [];


exports.getById = async (id, permission) => {
  try {
    for (let i = 0; i < modulePerm.length; i++) {
      if (permission[modulePerm[i]]) {
        newAssoc.push(associations[i])
      }
      let employeetrainingsessionsObj = await EmployeeTrainingsessions.findOne({ where: { id: id }, include: associations });
      if (!employeetrainingsessionsObj) {
        return response(BAD_REQUEST, "Employee training session not found");
      }
      employeetrainingsessionsObj = employeetrainingsessions_resource.transform(employeetrainingsessionsObj);
      return response(OK, "The Employeetrainingsession with the ID is  found", employeetrainingsessionsObj);
    } 
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  };
}
exports.create = async (payload, ussr,permission) => {
  try {
    let employeetrainingsessionsObj = await EmployeeTrainingsessions.create(payload);
    let a = await this.getById(employeetrainingsessionsObj.id, permission);
    eh("create", ussr, EmpDHC.emptrasess_create, a);
    employeetrainingsessionsObj = a.data;
    return response(OK, "New employee created", employeetrainingsessionsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, ussr) => {
  let a, b;
  try {
    a = await EmployeeTrainingsessions.findOne({ where: { id: id }, include: ['employee_employee', 'trainingsession_trainingsession'] });
    await EmployeeTrainingsessions.update(payload, { where: { id: id } });
    if (!a) {
      return response(BAD_REQUEST, "Employee training session not found");
    }
    b = await EmployeeTrainingsessions.findOne({ where: { id: id } });
    eh("update", ussr, EmpDHC.emptrasess_update, a, b);
    let employeetrainingsessionsupdateObj = (await this.getById(id,permission)).data;
    return response(OK, "Employeetrainingsession,  You Updated Sucessfully", employeetrainingsessionsupdateObj);
  } catch (error) {
    eh("update_failed", ussr, EmpDHC.emptrasess_update, a, b);
    return response(INTERNAL_SERVER_ERROR, error.message); // Return exception
  }
};

exports.list = async (permission) => {
  try {
    for (let i = 0; i < modulePerm.length; i++) {
      if (permission[modulePerm[i]]) {
        newAssoc.push(associations[i])
      }
      let employeetrainingsessionslistObj = await EmployeeTrainingsessions.findAll(
        {
          include: associations,
          order: [['id', 'DESC']]
        }
      );
      employeetrainingsessionslistObj = employeetrainingsessions_resource.transformCollection(employeetrainingsessionslistObj);
      return response(OK, "List of Employeetrainingsession", employeetrainingsessionslistObj);
    }
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
}

exports.remove = async (id, ussr) => {
  let a;
  try {
    a = await this.getById(id);
    let employeetrainingsessionsremoveObj = await EmployeeTrainingsessions.destroy({ where: { id: id } });
    if (!employeetrainingsessionsremoveObj) {
      return response(BAD_REQUEST, "Employee training session not found");
    }
    eh("delete", ussr, EmpDHC.emptrasess_delete, a);
    console.log(employeetrainingsessionsremoveObj)
    return response(OK, "EmployeetrainingsessionId removed successfully", employeetrainingsessionsremoveObj);
  } catch (error) {
    eh("delete_failed", ussr, EmpDHC.emptrasess_delete, a);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};