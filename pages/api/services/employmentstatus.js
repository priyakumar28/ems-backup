const { OK, INTERNAL_SERVER_ERROR } = require('../config/status_codes');
const { models: {
    employmentstatus: EmploymentStatus
} } = require('../models');
const employmentstatusResource = require('../resources/employmentstatus')

exports.getById = async (id) => {
    try {
        let employmentstatusObj = await EmploymentStatus.findOne({ where: { id: id } });
        return response(OK, "Employment status", employmentstatusResource.transform(employmentstatusObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let employmentstatusObj = await EmploymentStatus.create(payload);
        return response(OK, "New employment status created", employmentstatusResource.transform(employmentstatusObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (id, payload) => {
    try {
        let employmentstatusObj = await EmploymentStatus.update(payload, { where: { id: id }, returning: true });
        employmentstatusObj = (await this.getById(id)).data;
        return response(OK, "Employment status updated", employmentstatusObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let employmentstatusObj = await EmploymentStatus.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "list of employement status", employmentstatusResource.transformCollection(employmentstatusObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let employmentstatusObj = await EmploymentStatus.destroy({ where: { id: id } });
        return response(OK, "Employment status deleted", employmentstatusObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}


