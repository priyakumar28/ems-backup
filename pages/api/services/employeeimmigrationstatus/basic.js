const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeeimmigrationstatus: employeeImmigraionStatus
} } = require('../../models');

const employeeimmigrationstatus = require('../../resources/employeeimmigrationstatus')

exports.getById = async (id) => {
    try {
        // await employeeImmigraionStatus.findById(id)
        let EmployeeImmigrationstatusGetByIdObj = await employeeImmigraionStatus.findOne(
            {
                include:

                    ['employee_employee',

                        'status_immigrationstatus'

                    ]
            },
            { where: { id: id } });
        // Return employeeImmigraionStatus by his/her id by calling the employeeImmigraionStatus services
        return response(OK, "education based on id", employeeimmigrationstatus.transform(EmployeeImmigrationstatusGetByIdObj));

    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let employeeImmigraionstatusCreateObj = await employeeImmigraionStatus.create(payload);
        // Create new employeeImmigraionStatus by calling the employeeImmigraionStatus services and return response
        return response(OK, "New employee created", employeeImmigraionstatusCreateObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let employeeImmigrationstatusUpdateObj = await employeeImmigraionStatus.update(payload, { where: { id: id }, returning: true });
        employeeImmigrationstatusUpdateObj = (await this.getById(id)).data;
        // Update an employeeImmigraionStatus by calling the employeeImmigraionStatus services and return response
        return response(OK, "existing education updated", employeeImmigrationstatusUpdateObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeImmigrationstatusListObj = await employeeImmigraionStatus.findAll(
            {
                include: ['employee_employee', 'status_immigrationstatus'],
                order: [['id', 'DESC']]
            }
        );
        //Return employeeImmigraionStatus list by calling the employeeImmigraionStatus services
        return response(OK, "list of employee educations", employeeimmigrationstatus.transformCollection(employeeImmigrationstatusListObj));

    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // employeeImmigraionStatus.Destroy (is not exactly delete, like setting deleted flag)
        let employeeImmigraionstatusRemoveIdObj = await employeeImmigraionStatus.destroy({ where: { id: id } });
        // Remove the employeeImmigraionStatus by his/her id by calling the employeeImmigraionStatus services
        return response(OK, "remove  based on id", employeeImmigraionstatusRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}