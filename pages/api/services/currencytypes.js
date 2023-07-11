const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    currencytypes: Currencytypes
} } = require('../models');

const currencytypesResource = require('../resources/currencytypes');

exports.getById = async (id) => {
    try {
        let currencytypesObj = await Currencytypes.findOne({
          where: { id: id },
          include: ["employeesalaries"],
        });
        return response(OK, "Currencytypes", currencytypesResource.transform(currencytypesObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};
exports.create = async (payload) => {
    try {
        let currencytypesObj = await Currencytypes.create(payload);
        return response(OK, "Currencytypes are created", currencytypesObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
exports.list = async () => {
    try {
        let currencytypesObj = await Currencytypes.findAll({
          include: ["employeesalaries"],
          order: [["id", "DESC"]],
        });
        return response(OK, "Currencytypes are Retrived", currencytypesResource.transformCollection(currencytypesObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id, payload) => {
    try {
        let currencytypesObj = await Currencytypes.update(payload, { where: { id: id }, returning: true });
        currencytypesObj = (await this.getById(id)).data;
        return response(OK, "Updated", currencytypesObj);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.remove = async (id) => {
    try {
        let currencytypesObj = await Currencytypes.destroy({ where: { id: id } });
        return response(OK, "Currencytypes are deleted", currencytypesObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
}
const response = (code, message, data = {}) => {
    return { code, message, data };
}