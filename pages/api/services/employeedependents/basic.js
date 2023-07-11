const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeedependents: EmployeeDependents
} } = require('../../models');
const employees = require('../../models/employees');
const employeedependentsResource = require('../../resources/employeedependents')

exports.getById = async (id) => {
    try {

        // Return employeeDependents by his/her id by calling the employeeDependents services
        let employeedependentObj = await EmployeeDependents.findOne({
            where: { id: id },
            include: ['employee_employee']
        });
        if (!employeedependentObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        return response(OK, "employee dependent details:", employeedependentsResource.transform(employeedependentObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let employeedependentObj = await EmployeeDependents.create(payload);
        // Create new employeeDependent by calling the employeeDependent services and return response
        return response(OK, "New Employee Dependents Created", employeedependentObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        // Update an employeeDependent by calling the employeeDependent services and return response

        let employeedependentObj = await EmployeeDependents.update(payload, { where: { id: id }, returning: true });
        if (!employeedependentObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        employeedependentObj = (await this.getById(id)).data;
        return response(OK, "Employee dependent updated", employeedependentObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // EmployeeDependent.list
        // Return employeeDependent list by calling the employeeDependent services
        let employeedependentObj = await EmployeeDependents.findAll(
            {
                include: 'employee_employee',
                order: [['id', 'DESC']]
            });
        return response(OK, "Employee Dependents List", employeedependentsResource.transformCollection(employeedependentObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // EmployeesDependent.Destroy (is not exactly delete, like setting deleted flag)
        // Remove the employee by his/her id by calling the employee services
        let employeedependentObj = await EmployeeDependents.destroy({ where: { id: id } });
        return response(OK, "Employee Dependents Removed", employeedependentObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}