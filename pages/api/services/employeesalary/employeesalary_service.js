const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeesalary: EmployeeSalary
} } = require('../../models');

const employeesalary_resource = require('../../resources/employeesalary')

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        let employeesalaryObj =await EmployeeSalary.findOne({where:{id:id}},{include:['employee_employee','currency_currencytype']});
        // Return educations by his/her id by calling the educations services
        return response(OK, "education based on id",employeesalary_resource.transform(employeesalaryObj));
    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let employeesalaryObj = await EmployeeSalary.create(payload);
        // Create new education by calling the education services and return response
        return response(OK, "New employee created", employeesalaryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let employeesalaryObj =await EmployeeSalary.update(payload,{where:{id:id}});
        // Update an educations by calling the educations services and return response
        return response(OK, "existing education updated", employeesalaryObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // EmployeeSalary.list
        let educationsListObj = await EmployeeSalary.findAll({
            include: ['employee_employee', 'currency_currencytype'],
            order: [['id', 'DESC']]
        });
        // Return educations list by calling the educations services
        return response(OK, "list of educations",employeesalary_resource.transformCollection(educationsListObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(id) => {
    try {
        // EmployeeSalary.Destroy (is not exactly delete, like setting deleted flag)
        let educationsRemoveIdObj =await EmployeeSalary.destroy({where:{id:id}});
        // Remove the educations by his/her id by calling the educations services
        return response(OK, "remove  based on id", educationsRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
 
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}