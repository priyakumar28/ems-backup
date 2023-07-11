const { dateoverlap } = require("../../../../lib/helpers");
const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} = require("../../config/status_codes");
const { response } = require("../../helpers");
const {
  models: { employeetimesheets: EmployeeTimeSheets },
} = require("../../models");
const employeetimesheet = require("../../resources/employeetimesheets");

exports.getById = async (id) => {
  try {
    // await Employees.findById(id)
    let employeetimesheetsGetByIdObj = await EmployeeTimeSheets.findOne({
      where: { id: id },
      include: ["employee_employee"],
    });
    // Return employeetimesheets by his/her id by calling the employeetimesheets services
    return response(
      OK,
      "employeetimesheets based on id",
      employeetimesheet.transform(employeetimesheetsGetByIdObj)
    );
  } catch (error) {
    // Return exception
  }
};

exports.getByEmployeeId = async (id) => {
  try {
    // await Employees.findById(id)
    let employeetimesheetsGetByIdObj = await EmployeeTimeSheets.findAll({
      where: { employee: id },
      include: ["employee_employee"],
      order: [["id", "DESC"]],
    });
    // Return employeetimesheets by his/her id by calling the employeetimesheets services

    return response(
      OK,
      "employeetimesheets based on employee id",
      employeetimesheet.transformCollection(employeetimesheetsGetByIdObj)
    );
  } catch (error) {
    // Return exception
  }
};

exports.create = async (payload) => {
  try {

    let employeetimesheetscreateObj = await EmployeeTimeSheets.create(payload);

    // Create new employeetimesheets by calling the employeetimesheets services and return response
    return response(
      OK,
      "New employeetimesheets created",
      employeetimesheetscreateObj
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    // Employeetimesheet update obj
    let ARRAY = await EmployeeTimeSheets.findAll();
    const listneed = employeetimesheet.transformCollection(ARRAY);

    await EmployeeTimeSheets.update(payload, {
      where: { id: id },
      returning: true,
    });
    let employeetimesheetsUpdateObj = await this.getById(id);
    // Update an employeetimesheets by calling the employeetimesheets services and return response

    return response(
      OK,
      "existing employeetimesheets updated",
      employeetimesheetsUpdateObj
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (whereObj = null) => {
  try {
    let options = {
      order: [["id", "DESC"]],
    };
    if (whereObj !== "all") {
      options["where"] = whereObj;
    }
    let employeetimesheetslistObj = await EmployeeTimeSheets.findAll({
      include: ["employee_employee"],
      order: [["id", "DESC"]],
    });

    // Return employeetimesheets list by calling the employeetimesheets services
    return response(
      OK,
      "list of employeetimesheets",
      employeetimesheet.transformCollection(employeetimesheetslistObj)
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    // Educations.Destroy (is not exactly delete, like setting deleted flag)
    let employeetimesheetsRemoveIdObj = await EmployeeTimeSheets.destroy({
      where: { id: id },
    });
    // Remove the employeetimesheets by his/her id by calling the employeetimesheets services
    return response(OK, "remove  based on id", employeetimesheetsRemoveIdObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
