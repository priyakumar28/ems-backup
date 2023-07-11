const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const { models: {
  workdays: Workdays
} } = require("../../models");
const workdays = require('../../resources/workdays');

exports.getById = async (id) => {
  try {
    let workdaysObj = await Workdays.findOne({ where: { id: id } });
    return response(OK, "workdays with given id:  " + id, workdays.transform(workdaysObj));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload) => {
  try {
    let workdaysObj = await Workdays.create(payload);
    return response(OK, "New workdays created", workdaysObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    let workdaysObj = await Workdays.update(payload, { where: { id: id }, returning: true });
    workdaysObj = (await this.getById(id)).data;
    return response(OK, "workdays updated successfully", workdaysObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let workdaysObj = await Workdays.findAll({
      order: [['id', 'DESC']],
    });
    return response(OK, "holidays list", workdays.transformCollection(workdaysObj));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let workdaysObj = await Workdays.destroy({ where: { id: id } });
    return response(OK, "workdays list", workdaysObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
