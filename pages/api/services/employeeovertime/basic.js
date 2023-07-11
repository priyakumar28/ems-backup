const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const {
  models: { employeeovertime: employeeovertime },
} = require("../../models");
const employeeovertimee = require('../../resources/employeeovertime');

exports.getById = async (id) => {
  try {
    // await Employees.findById(id)
    let employeeovertimeGetByIdObj =
      await employeeovertime.findOne({
        include:
          [
            "employee",
            "category"
          ],

      },
        { where: { id: id } });
    // Return employeeovertime by his/her id by calling the employeeovertime services
    return response(
      OK,
      "employeeovertime based on id",
      employeeovertimee.transform(employeeovertimeGetByIdObj)
    );
  } catch (error) {
    // Return exception
  }
};

exports.create = async (payload) => {
  try {

    let employeeovertimecreateObj =
      await employeeovertime.create(payload);

    // Create new employeeovertime by calling the employeeovertime services and return response
    return response(
      OK,
      "New employeeovertime created",
      employeeovertimecreateObj
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    // Employees.update
    let employeeovertimeUpdateObj =
      await employeeovertime.update(payload, { where: { id: id }, returning: true });
    employeeovertimeUpdateObj = (await this.getById(id)).data;
    // Update an employeeovertime by calling the employeeovertime services and return response
    return response(
      OK,
      "existing employeeovertime updated",
      employeeovertimeUpdateObj
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let employeeovertimelistObj = await employeeovertime.findAll({
      include:
        [
          "employee",
          "category"
        ],
      order: [['id', 'DESC']]
    });
    // Educations.list
    // let employeeemploymenthistorylistObj =
    //   await employeeemploymenthistory.findAll();
    // Return employeeemploymenthistory list by calling the employeeemploymenthistory services
    return response(OK, "list of employeeovertime", employeeovertimee.transformCollection(employeeovertimelistObj)
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    // Educations.Destroy (is not exactly delete, like setting deleted flag)
    let employeeovertimeRemoveIdObj =
      await employeeovertime.destroy({ where: { id: id } });
    // Remove the employeeovertime by his/her id by calling the employeeovertime services
    return response(
      OK,
      "remove  based on id",
      employeeovertimeRemoveIdObj
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
