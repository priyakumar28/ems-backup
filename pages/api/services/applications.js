const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    applications: Applications
} } = require('../models');
const applicationResource = require('../resources/applications')



exports.getById = async (id) => {
    try {
        let applicationsObj = await Applications.findOne({
            where: { id: id },
            include: [
                "job_job",
                "candidate_candidate",
            ]

        });
        return response(OK, "Applications", applicationResource.transform(applicationsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {

        let jobid = await Applications.findOne({ where: { job: payload.job } });
        if (jobid)
            return response(BAD_REQUEST, "job already assigned");
        let candid = await Applications.findOne({ where: { candidate: payload.candidate } });
        if (candid)
            return response(BAD_REQUEST, "candidate already assigned");

        let applicationsObj = await Applications.create(payload);
        return response(OK, "New Application created", applicationResource.transform(applicationsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (id, payload) => {
    try {
        let applicationsObj = await Applications.update(payload, { where: { id: id }, returning: true });
        applicationsObj = (await this.getById(id)).data;
        applicationsObj = applicationResource.transform(applicationsObj);
        return response(OK, "Application updated", applicationsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let applicationsObj = await Applications.findAll({
            include: [
                "job_job",
                "candidate_candidate",
            ],
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Applications", applicationResource.transformCollection(applicationsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let applicationsObj = await Applications.destroy({ where: { id: id } });
        return response(OK, "Application deleted", applicationsObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}


