const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    employeeattendancesheets: Employeeattendancesheets
} } = require('../models');
const employeeattendancesheetsResource = require('../resources/employeeattendancesheets')



exports.getById = async (id) => {
    try {
        let employeeattendancesheetsObj = await Employeeattendancesheets.findOne({ where: { id: id } });
        return response(OK, "Employeeattendancesheets", employeeattendancesheetsResource.transform(employeeattendancesheetsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let empid = await Employeeattendancesheets.findOne({ where: { employee_id: payload.employee_id } });
        if (empid)
            return response(BAD_REQUEST, "employeeid already exists");


        let employeeattendancesheetsObj = await Employeeattendancesheets.create(payload);
        return response(OK, "New Employeeattendancesheets created", employeeattendancesheetsResource.transform(employeeattendancesheetsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (id, payload) => {
    try {
        let employeeattendancesheetsObj = await Employeeattendancesheets.update(payload, { where: { id: id }, returning: true });
        employeeattendancesheetsObj = (await this.getById(id)).data;
        return response(OK, "Employeeattendancesheets updated", employeeattendancesheetsObj);


    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let employeeattendancesheetsObj = await Employeeattendancesheets.findAll({
            include: [
                "employee",
            ],
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Employeeattendancesheets", employeeattendancesheetsResource.transformCollection(employeeattendancesheetsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let employeeattendancesheetsObj = await Employeeattendancesheets.destroy({ where: { id: id } });
        return response(OK, "Employeeattendancesheets deleted", employeeattendancesheetsObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}


