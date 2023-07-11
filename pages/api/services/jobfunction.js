const { OK, INTERNAL_SERVER_ERROR } = require("../config/status_codes");
const {
  models: { jobfunction: Jobfunction },
} = require("../models");
const job = require("../models/job");
const jobfunctionResource = require("../resources/jobfunction");

exports.getById = async (id) => {
  try {
    let jobfunctionObj = await Jobfunction.findOne({ where: { id: id } });
    return response(
      OK,
      "Job Function",
      jobfunctionResource.transform(jobfunctionObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload) => {
  try {
    let jobfunctionObj = await Jobfunction.create(payload);
    return response(
      OK,
      "New Jobfunction created",
      jobfunctionResource.transform(jobfunctionObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (id, payload) => {
  try {
    await Jobfunction.update(payload, { where: { id: id }, returning: true });
    let jobfunctionObj = (await this.getById(id)).data;
    return response(OK, "Job function updated", jobfunctionObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let jobfunctionObj = await Jobfunction.findAll({
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "list of Job function",
      jobfunctionResource.transformCollection(jobfunctionObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let jobfunctionObj = await Jobfunction.destroy({ where: { id: id } });
    return response(OK, "Job function deleted", jobfunctionObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
