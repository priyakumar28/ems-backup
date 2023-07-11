const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeeimmigrations: employeeImmigraions
} } = require('../../models');

const employeeimmigration = require('../../resources/employeeimmigrations')

exports.getById = async (id) => {
    try {
        // await employeeeducations.findById(id)
        let EmployeeImmigrationsGetByIdObj = await employeeImmigraions.findOne(
            {
                include:

                    ['employee_employee',

                        'document_immigrationdocument'

                    ]
            },
            { where: { id: id } });
        // Return employeeeducations by his/her id by calling the employeeeducations services
        return response(OK, "education based on id", employeeimmigration.transform(EmployeeImmigrationsGetByIdObj));

    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let employeeImmigraionsCreateObj = await employeeImmigraions.create(payload);
        // Create new employeeeducations by calling the employeeeducations services and return response
        return response(OK, "New employee created", employeeImmigraionsCreateObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let employeeImmigrationsUpdateObj = await employeeImmigraions.update(payload, { where: { id: id }, returning: true });
        employeeImmigrationsUpdateObj = (await this.getById(id)).data;
        // Update an employeeeducations by calling the employeeeducations services and return response
        return response(OK, "existing education updated", employeeImmigrationsUpdateObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeImmigrationsListObj = await employeeImmigraions.findAll(
            {
                include: ['employee_employee', 'document_immigrationdocument'],
                order: [['id', 'DESC']]
            }
        );
        //Return employeeeducations list by calling the employeeeducations services
        return response(OK, "list of employee educations", employeeimmigration.transformCollection(employeeImmigrationsListObj));
        // // employeeeducations.list
        // let employeeEducationsListObj = await employeeEducations.findAll();
        // // Return educations list by calling the educations services
        // return response(OK, "list of educations", employeeEducationsListObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // employeeeducations.Destroy (is not exactly delete, like setting deleted flag)
        let employeeImmigraionsRemoveIdObj = await employeeImmigraions.destroy({ where: { id: id } });
        // Remove the employeeeducations by his/her id by calling the employeeeducations services
        return response(OK, "remove  based on id", employeeImmigraionsRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}