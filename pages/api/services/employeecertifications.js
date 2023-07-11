const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../config/status_codes');
const { models: {
    employeecertifications: Employeecertifications
} } = require('../models');
const employeecertificationResource = require('../resources/employeecertifications');

exports.getById = async (id) => {
    try {
        let employeecertificationsObj = await Employeecertifications.findOne({ where: { id },include:"employee_employee" });

        if (!employeecertificationsObj) {
            return response(NOT_FOUND, "Employee certification not found");
        }
        return response(OK, "Employee certification found", employeecertificationResource.transform(employeecertificationsObj));
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let employeecertificationsObj = await Employeecertifications.create(payload);
        return response(OK, "Employee certification created", employeecertificationResource.transform(employeecertificationsObj));
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        await Employeecertifications.update(payload, { where: { id: id } });
        let employeecertificationsObj = (await this.getById(id)).data;
        return response(OK, "Employee certification updated", employeecertificationsObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeecertificationsObj = await Employeecertifications.findAll({ order: [['id', 'DESC']], });
        return response(OK, "list of Employeecertifications", employeecertificationResource.transform(employeecertificationsObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (idn) => {
    try {
        let employeecertificationsObj = await Employeecertifications.destroy({
            where: {
                id: idn
            }
        });
        return response(OK, "Employee leave record deleted", employeecertificationsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}