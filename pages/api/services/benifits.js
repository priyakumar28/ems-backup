const { OK, INTERNAL_SERVER_ERROR } = require('../config/status_codes');
const { models: {
    benifits: Benifits
} } = require('../models');
const benifitsResource = require('../resources/benifits')

exports.getById = async (id) => {
    try {
        let benifitsObj = await Benifits.findOne({ where: { id: id } });
        return response(OK, "Benifits", benifitsResource.transform(benifitsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let benifitsObj = await Benifits.create(payload);
        return response(OK, "New Benifits created", benifitsResource.transform(benifitsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (id, payload) => {
    try {
        let benifitsObj = await Benifits.update(payload, { where: { id: id }, returning: true });
        benifitsObj = (await this.getById(id)).data;
        return response(OK, "Benifits updated", benifitsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let benifitsObj = await Benifits.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Benifits", benifitsResource.transformCollection(benifitsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let benifitsObj = await Benifits.destroy({ where: { id: id } });
        return response(OK, "Benifits deleted", benifitsObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}


