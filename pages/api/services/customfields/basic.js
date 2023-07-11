const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    customfields: Customfields
} } = require('../../models');
const customfieldsResource = require('../../resources/customfields')

exports.getById = async (id) => {
    try {

        // Return Customfields id by calling the Customfields services
        let customfieldObj = await Customfields.findOne({ where: { id: id } });
        if (!customfieldObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        return response(OK, "Got Data by given Id", customfieldsResource.transform(customfieldObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let customfieldObj = await Customfields.create(payload);
        // Create new customfield by calling the customfield services and return response
        return response(OK, "New Customfield Created", customfieldsResource.transform(customfieldObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        // Update an customfield by calling the customfield services and return response

        let customfieldObj = await Customfields.update(payload, { where: { id: id }, returning: true });
        if (!customfieldObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        customfieldObj = (await this.getById(id)).data;
        return response(OK, "Customfield updated", customfieldObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // customfield.list
        // Return customfield list by calling the customfield services
        let customfieldObj = await Customfields.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "Customfields List Found", customfieldsResource.transformCollection(customfieldObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message)
    }
};

exports.remove = async (id) => {
    try {
        // EmployeesDependent.Destroy (is not exactly delete, like setting deleted flag)
        // Remove the employee by his/her id by calling the employee services
        let customfieldObj = await Customfields.destroy({ where: { id: id } });
        return response(OK, "Custom field Removed", customfieldObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}