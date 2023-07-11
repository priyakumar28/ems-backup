const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    forms:Forms
}} = require('../../models');

const forms_resource = require('../../resources/forms')

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        // Return employee by his/her id by calling the employee services
        let formsObj = await Forms.findOne({ where: { id: id } });
        return response(OK, "The forms with the ID is  found", forms_resource.transform(formsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let formsObj = await Forms.create(payload);
        // Create new employee by calling the employee services and return response
        return response(OK, "New form created", formsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        // Update an employee by calling the employee services and return response
        let formsupdateObj = await Forms.update(payload, { where: { id: id } });

        return response(OK, "forms,  You Updated Sucessfully", formsupdateObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);        // Return exception
    }
};





exports.list = async () => {
    try {
        // Employees.list
        // Return employees list by calling the employee services

        let formslistObj = await Forms.findAll(
            {
            order: [['id', 'DESC']]
            }
        );

        return response(OK, "List of forms", forms_resource.transformCollection(formslistObj));

    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



exports.remove = async (id) => {
    try {
        // Employees.Destroy (is not exactly delete, like setting deleted flag)
        // Remove the employee by his/her id by calling the employee services
        let formsremoveObj = await Forms.destroy({ where: { id: id } });
        return response(OK, "forms removed successfully", formsremoveObj);

    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}