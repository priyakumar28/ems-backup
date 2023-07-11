const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const {
  models: { holidays: Holidays },
} = require("../../models");
const holidays = require("../../resources/holidays");

exports.getById = async (id) => {
  try {
    let holidaysgetByIdObj = await Holidays.findOne({ where: { id: id } });
    return response(
      OK,
      "holidays with given id:  " + id,
      holidays.transform(holidaysgetByIdObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload) => {
  try {
    let holidayscreateObj = await Holidays.create(payload);
    return response(OK, "New holidays created", holidayscreateObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    await Holidays.update(payload, { where: { id: id }, returning: true });
    let holidaysupdateObj = (await this.getById(id)).data;
    return response(OK, "holidays updated successfully", holidaysupdateObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let holidaylistsObj = await Holidays.findAll({
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "holidays list",
      holidays.transformCollection(holidaylistsObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let holidaysremoveObj = await Holidays.destroy({ where: { id: id } });
    return response(OK, "Record successfully deleted", holidaysremoveObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
