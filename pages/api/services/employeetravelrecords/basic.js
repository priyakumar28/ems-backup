const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeetravelrecords: employeeTravelRecords
} } = require('../../models');

const employeetravelrecords = require('../../resources/employeetravelrecords')

exports.getById = async (id) => {
    try {
        // await employeeeducations.findById(id)
        let employeeTravelrecordsGetByIdObj = await employeeTravelRecords.findOne(
            {
                include:

                    'employee_employee'



            },
            { where: { id: id } });
        // Return employeeeducations by his/her id by calling the employeeeducations services
        return response(OK, "education based on id", employeetravelrecords.transform(employeeTravelrecordsGetByIdObj));

    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let employeeTravelrecordsCreateObj = await employeeTravelRecords.create(payload);
        // Create new employeeeducations by calling the employeeeducations services and return response
        return response(OK, "New employee created", employeeTravelrecordsCreateObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let employeeTravelrecordsUpdateObj = await employeeTravelRecords.update(payload, { where: { id: id }, returning: true });
        employeeTravelrecordsUpdateObj = (await this.getById(id)).data;
        // Update an employeeeducations by calling the employeeeducations services and return response
        return response(OK, "existing education updated", employeeTravelrecordsUpdateObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeTravelrecordsListObj = await employeeTravelRecords.findAll(

            {
                include:

                    'employee_employee',
                order: [['id', 'DESC']]


            }         ,

        );
        //Return employeeeducations list by calling the employeeeducations services
        return response(OK, "list of employee educations", employeetravelrecords.transformCollection(employeeTravelrecordsListObj));
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
        let employeeTravelrecordsRemoveIdObj = await employeeTravelRecords.destroy({ where: { id: id } });
        // Remove the employeeeducations by his/her id by calling the employeeeducations services
        return response(OK, "remove  based on id", employeeTravelrecordsRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}