const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    fieldnamemappings: FieldNameMappings
} } = require('../../models');

const fieldResource = require('../../resources/fieldnamemapping');

exports.create = async (payload) => {
    try {

        let fieldnamemappingObj = await FieldNameMappings.create(payload);
        fieldnamemappingObj = fieldResource.transform(fieldnamemappingObj);
        return response(OK, "New Fieldnamemappings created", fieldnamemappingObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};
exports.update = async (id, payload) => {
    try {
        let fieldnamemappingObj = await FieldNameMappings.update(payload, { where: { id: id }, returning: true });
        fieldnamemappingObj = (await this.getById(id)).data;
        return response(OK, "row updated", fieldnamemappingObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let fieldnamemappingObj = await FieldNameMappings.destroy({ where: { id: id } });
        return response(OK, "deleting data", fieldnamemappingObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.getById = async (id) => {
    try {
        let fieldnamemappingObj = await FieldNameMappings.findOne({ where: { id: id } });

        return response(OK, "getting data individually throuh ID", fieldResource.transform(fieldnamemappingObj))

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let fieldnamemappingObj = await FieldNameMappings.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "finding the data", fieldResource.transformCollection(fieldnamemappingObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
const response = (code, message, data = {}) => {
    return { code, message, data };
}
