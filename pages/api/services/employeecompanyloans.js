const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    employeecompanyloans: EmployeeCompanyLoans
} } = require('../models');

const employeecompanyloansResource = require('../resources/employeecompanyloans')

exports.getById = async (id) => {
    try {
        let employeeCompanyLoanObj = await EmployeeCompanyLoans.findOne({
            where: { id: id }, include: [
                "employee_employee",
                "loan_companyloan"
            ]
        });
        return response(OK, "EmployeeCompanyLoans", employeecompanyloansResource.transform(employeeCompanyLoanObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};
exports.create = async (payload) => {
    try {
        let employeeCompanyLoanObj = await EmployeeCompanyLoans.create(payload);
        return response(OK, "EmployeeCompanyLoans are created", employeeCompanyLoanObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
exports.list = async () => {
    try {
        let employeeCompanyLoanObj = await EmployeeCompanyLoans.findAll({
            include: [
                "employee_employee",
                "loan_companyloan"
            ],
            order: [['id', 'DESC']],
        });
        return response(OK, "EmployeeCompanyLoans are Retrived", employeecompanyloansResource.transformCollection(employeeCompanyLoanObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id, payload) => {
    try {
        let employeeCompanyLoanObj = await EmployeeCompanyLoans.update(payload, { where: { id: id }, returning: true });
        employeeCompanyLoanObj = (await this.getById(id)).data;
        return response(OK, "Updated", employeeCompanyLoanObj);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.remove = async (id) => {
    try {
        let employeeCompanyLoanObj = await EmployeeCompanyLoans.destroy({ where: { id: id } });
        return response(OK, "EmployeeCompanyLoans are deleted", employeeCompanyLoanObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
}
const response = (code, message, data = {}) => {
    return { code, message, data };
}