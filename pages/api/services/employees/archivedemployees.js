const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require("../../config/status_codes");
const {
  models: { archivedemployees: ArchivedEmployees },
} = require("../../models");

const archivedEmployeeResource = require('../../resources/archivedemployees');

exports.getById = async (id) => {
  try {
    let archivedEmployeeObj = await ArchivedEmployees.findOne({
      where: { id: id },
    });
    if (!archivedEmployeeObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    return response(
      OK,
      "archived employee with given id:  " + id,
      archivedEmployeeResource.transform(archivedEmployeeObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload) => {
  try {
    let archivedEmployeeObj = await ArchivedEmployees.findOne({
      where: { work_email: payload.work_email },
    });
    if (archivedEmployeeObj) {
      return response(BAD_REQUEST, "work email is already registered");
    }
    archivedEmployeeObj = await ArchivedEmployees.create(payload);
    return response(OK, "New employee created", archivedEmployeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    let archivedEmployeeObj = await ArchivedEmployees.findOne({
      where: { id: id },
    });
    if (!archivedEmployeeObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    archivedEmployeeObj = await ArchivedEmployees.update(payload, {
      where: { id: id },
    });
    return response(OK, "employee updated successfully", archivedEmployeeResource.transformCollection(archivedEmployeeObj));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let archivedEmployeeObj = await ArchivedEmployees.findAll({
      order: [['id', 'DESC']],
    });
    return response(OK, "archived employees list", archivedEmployeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let archivedEmployeeObj = await ArchivedEmployees.destroy({
      where: { id: id },
    });
    return response(OK, "employees list", archivedEmployeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
