const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeeforms: employeeForms
} } = require('../../models');


const employeeforms = require('../../resources/employeeforms')

exports.getById = async (id) => {
    try {
        // await employeeeducations.findById(id)
        let EmployeeFormsGetByIdObj = await employeeForms.findOne(
            {
                include:

                    ['employee',

                        'form'

                    ]
            },
            { where: { id: id } });
        // Return employeeeducations by his/her id by calling the employeeeducations services
        return response(OK, "education based on id", employeeforms.transform(EmployeeFormsGetByIdObj));

    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let employeeFormsCreateObj = await employeeForms.create(payload);
        // Create new employeeeducations by calling the employeeeducations services and return response
        return response(OK, "New employee created", employeeFormsCreateObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let employeeFormsUpdateObj = await employeeForms.update(payload, { where: { id: id }, returning: true });
        employeeFormsUpdateObj = (await this.getById(id)).data;
        // Update an employeeeducations by calling the employeeeducations services and return response
        return response(OK, "existing education updated", employeeFormsUpdateObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeFormsListObj = await employeeForms.findAll(
            {
                include: ['employee', 'form'],
                order: [['id', 'DESC']]
            }
        );
        //Return employeeeducations list by calling the employeeeducations services
        return response(OK, "list of employee educations", employeeforms.transformCollection(employeeFormsListObj));
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
        let employeeFormsRemoveIdObj = await employeeForms.destroy({ where: { id: id } });
        // Remove the employeeeducations by his/her id by calling the employeeeducations services
        return response(OK, "remove  based on id", employeeFormsRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}