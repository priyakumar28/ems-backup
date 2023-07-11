const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    calls: Calls
} } = require('../models');
const callsResource = require('../resources/calls')

exports.getById = async (id) => {
    try {
        let callsObj = await Calls.findOne({
            where: { id: id },

            include: [
                "candidate_candidate",
                "job_job"
            ], returning: true
        });

        return response(OK, "Calls data", callsResource.transform(callsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};
exports.create = async (payload) => {
    try {
        let callsObj = await Calls.create(payload);
        return response(OK, "Calls are created", callsObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let callsObj = await Calls.findAll({

            include: [
                "candidate_candidate",
                "job_job"
            ], returning: true,
            order: [['id', 'DESC']],
        });
        return response(OK, "Calls are Retrived", callsResource.transformCollection(callsObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id, payload) => {
    try {
        let callsObj = await Calls.update(payload, {
            where: { id: id },
            returning: true
        });
        callsObj = (await this.getById(id)).data;
        return response(OK, "Updated", callsObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let callsObj = await Calls.destroy({ where: { id: id } });
        return response(OK, "Calls are deleted", callsObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
}
const response = (code, message, data = {}) => {
    return { code, message, data };
}