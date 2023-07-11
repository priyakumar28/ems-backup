const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR,BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    department: Department,
    designation: Designation
} } = require('../../models');
const departmentresource = require('../../resources/department');
const { Op } = require("sequelize");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Department management"]
moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES


exports.getById = async (id, permission) => {
  let association = [];
  if (permission[moduleCategory.VIEW_EMPLOYEES]) {
    association.push("rms_employees_department")
  }
  try {
    let departmentObj = await Department.findOne({
      where: { id: id },
      include: association,
    });
    if (!departmentObj) {
      return response(NOT_FOUND, "department detail not found", departmentObj);
    }
    return response(
      OK,
      "department detail",
      departmentresource.transform(departmentObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload) => {
    try {
        let [departmentObj, created] = await Department.findOrCreate({
            where: {
                [Op.or]: [
                    { code: payload.code },
                    { name: payload.name }
                ]
            },
            defaults: payload,
        });
        if (!created) {
            return response(BAD_REQUEST, "Department with this code or name already exists", departmentObj);
        }
        return response(OK, "New department created", departmentObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
//     let departmentObj = await Department.create(payload);
//     return response(OK, "New department created", departmentObj);
//   } catch (error) {
//     return response(INTERNAL_SERVER_ERROR, error.message);
//   }
};

exports.update = async (payload, id) => {
    let message;
    try {
        let departmentObj = await Department.findOne({ where: { id: id }, include: ["rms_employees_department"] });
        if (!departmentObj) {
            return response(NOT_FOUND, "department detail not found", departmentObj);
        }
        
        
        // console.log("funs",getAllFuncs(departmentObj));
        if (payload.hasOwnProperty("rManagers")) {
            let a = [];
            a.push(payload.rManagers.value);
            await departmentObj.addRms_employees_department(a);
            message = "selected reporting manager added"
        }
        else if(payload.hasOwnProperty("removeManager")){
            let rmid = payload.removeManager;
            await departmentObj.removeRms_employees_department(rmid);
            message = "selected reporting manager removed"
        }
        else {
            let dObj = await Department.findAll({
                where: {
                    [Op.or]: [
                        { code: payload.code },
                        { name: payload.name }
                    ],
                    id: { [Op.ne]: id }
                },
            });
            if (dObj?.length > 0) {
                return response(BAD_REQUEST, "Department with this code or name already exists");
            }
            await Department.update(payload, { where: { id: id } });
            if (payload.status === "In Active") {
                let payload1 = { status: "In Active" }
                await Designation.update(payload1, { where: { department: id } })
            }
            message = "current department updated";
        }
        departmentObj = await Department.findOne({ where: { id: id }, include: ["rms_employees_department"] });
        return response(OK, message, departmentresource.transform(departmentObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
    // console.log("funs",getAllFuncs(departmentObj));
};

exports.list = async (permission) => {
  let association = [];
  if (permission[moduleCategory.VIEW_EMPLOYEES]) {
    association.push("rms_employees_department")
  }
  try {
    let departmentObj = await Department.findAll({
      include: association,
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "list of departments",
      departmentresource.transformCollection(departmentObj)
    );
  } catch (error) {
return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (idn) => {
  try {
    let departmentObj = await Department.findOne({ where: { id: idn } });
    if (!departmentObj) {
      return response(NOT_FOUND, "department detail not found", departmentObj);
    }
    departmentObj = await Department.destroy({
      where: {
        id: idn,
      },
    });
    return response(
      OK,
      "current department record deleted",
      departmentresource.transform(departmentObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
