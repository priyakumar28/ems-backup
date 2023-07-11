const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: {
    employeeexpenses: EmployeeExpenses

} } = require('../../models');
const employeeExpensesResource = require('../../resources/employeeexpenses');
exports.getById = async (id) => {
    try {

        let employeeExpensesObj = await EmployeeExpenses.findOne({
            where: { id: id },
            include: [
                "employee_employee",
                "payment_method_expensespaymentmethod",
                "category_expensescategory"]

        });
        employeeExpensesObj = employeeExpensesResource.transform(employeeExpensesObj);
        return response(OK, "getting data individually throuh ID", employeeExpensesObj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let employeeExpensesObj = await EmployeeExpenses.create(payload);
        employeeExpensesObj = employeeExpensesResource.transform(employeeExpensesObj);
        return response(OK, "New  employee expenses created", employeeExpensesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.update = async (id, payload) => {
    try {
        let employeeExpensesObj = await EmployeeExpenses.update(payload, { where: { id: id }, returning: true });
        employeeExpensesObj = (await this.getById(id)).data;
        return response(OK, "row updated", employeeExpensesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.list = async () => {
    try {
        let employeeExpensesObj = await EmployeeExpenses.findAll({
            include: [
                "employee_employee",
                "payment_method_expensespaymentmethod",
                "category_expensescategory"
            ],
            order: [['id', 'DESC']]
        }

        );
        return response(OK, "finding the data", employeeExpensesResource.transformCollection(employeeExpensesObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let employeeExpensesObj = await EmployeeExpenses.destroy({ where: { id: id } });
        return response(OK, "deleting data", employeeExpensesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}

