const { OK, INTERNAL_SERVER_ERROR } = require('../config/status_codes');
const { models:
    {
        jobtitles: Jobtitles
    } } = require('../models');
const jobtitlesResource = require('../resources/jobtitles');

exports.getById = async (id) => {
    try {
        let jobtitleObj = await Jobtitles.findOne({
          where: { id: id },
          include: ["employees"],
        });
        return response(OK, "Job Title Recived", jobtitleObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let jobtitlesObj = await Jobtitles.create(payload);
        return response(OK, " New Job Title created", jobtitlesResource.transform(jobtitlesObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id, payload) => {
    try {
        let jobtitlesObj = await Jobtitles.update(payload, { where: { id: id }, returning: true });
        jobtitlesObj = (await this.getById(id)).data;

        return response(OK, "Updated", jobtitlesObj);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.list = async () => {
    try {
        let jobtitleObj = await Jobtitles.findAll({
          include: ["employees"],
          order: [["id", "DESC"]],
        });
        return response(OK, "Job Title for all Recived", jobtitlesResource.transformCollection(jobtitleObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let jobtitlesObj = await Jobtitles.destroy({ where: { id: id } });
        return response(OK, "Jobtitle successfully Deleted", jobtitlesObj);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



const response = (code, message, data = {}) => {
    return { code, message, data };
}