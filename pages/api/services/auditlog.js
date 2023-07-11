const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    auditlog: Auditlog
} } = require('../models');
const auditlogResource = require('../resources/auditlog')



exports.getById = async (id) => {
    try {
        let auditlogObj = await Auditlog.findOne({ where: { id: id } });
        return response(OK, "Auditlog", auditlogResource.transform(auditlogObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {

        let userid = await Auditlog.findOne({ where: { user_id: payload.user_id } });
        if (userid)
            return response(BAD_REQUEST, "userid already exists");


        let auditlogObj = await Auditlog.create(payload);
        return response(OK, "New Auditlog created", auditlogResource.transform(auditlogObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (id, payload) => {
    try {
        let auditlogObj = await Auditlog.update(payload, { where: { id: id }, returning: true });
        auditlogObj = (await this.getById(id)).data;
        return response(OK, "Auditlog updated", auditlogObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let auditlogObj = await Auditlog.findAll({
            include: [
                "user",
            ],
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Auditlog", auditlogResource.transformCollection(auditlogObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let auditlogObj = await Auditlog.destroy({ where: { id: id } });
        return response(OK, "Auditlog deleted", auditlogObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}


