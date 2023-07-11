const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    ethnicity: Ethnicity
} } = require('../../models');

const ethnicityResource = require('../../resources/ethnicity');

exports.getById = async (id) => {
    try {
        (id);
        let ethnicityObj = await Ethnicity.findOne({ where: { id: id } });
        return response(OK, "getting data individuallu through ID", ethnicityResource.transform(ethnicityObj))
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let ethnicityObj = await Ethnicity.create(payload);
        ethnicityObj = ethnicityResource.transform(ethnicityObj);
        return response(OK, "new ethincity creted", ethnicityObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.update = async (id, payload) => {
    try {
        let ethnicityObj = await Ethnicity.update(payload, { where: { id: id }, returning: true });
        ethnicityObj = (await this.getById(id)).data;
        return response(OK, "row updated", ethnicityObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let ethnicityObj = await Ethnicity.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "finding the data", ethnicityResource.transformCollection(ethnicityObj))
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let ethnicityObj = await Ethnicity.destroy({ where: { id: id } });
        return response(OK, "deleting data", ethnicityObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message)
    }
};
const response = (code, message, data = {}) => {
    return { code, message, data };
};