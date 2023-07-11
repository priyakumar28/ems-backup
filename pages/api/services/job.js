const { OK, INTERNAL_SERVER_ERROR } = require('../config/status_codes');
const { models: {
    job: Job
} } = require('../models');
const jobResource = require('../resources/job')

exports.getById = async (id) => {
    try {
        let jobObj = await Job.findOne({ where: { id: id } });
        return response(OK, "Job", jobResource.transform(jobObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let jobObj = await Job.create(payload);
        return response(OK, "New Job created", jobResource.transform(jobObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (payload, id) => {
    try {
        await Job.update(payload, { where: { id: id }, returning: true });
        let jobObj = (await this.getById(id)).data;
        return response(OK, "Job updated", jobObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let jobObj = await Job.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Job", jobResource.transformCollection(jobObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let jobObj = await Job.destroy({ where: { id: id } });
        return response(OK, "Job deleted", jobObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}
