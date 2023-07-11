// const { resource } = require('../../..');
const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    files: Files
} } = require('../../models');

const files_resource = require('../../resources/files')

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        // Return employee by his/her id by calling the employee services
        let filesObj = await Files.findOne({ where: { id: id } });
        return response(OK, "The Files with the ID is  found", files_resource.transform(filesObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let filesObj = await Files.create(payload);
        // Create new employee by calling the employee services and return response
        return response(OK, "New file created", filesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        // Update an employee by calling the employee services and return response
        let filesupdateObj = await Files.update(payload, { where: { id: id } });

        return response(OK, "Files,  You Updated Sucessfully", filesupdateObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);        // Return exception
    }
};





exports.list = async () => {
    try {
        // Employees.list
        // Return employees list by calling the employee services

        let fileslistObj = await Files.findAll(
            {
            order: [['id', 'DESC']]
            }
        );

        return response(OK, "List of Files", files_resource.transformCollection(fileslistObj));

    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



exports.remove = async (id) => {
    try {
        // Employees.Destroy (is not exactly delete, like setting deleted flag)
        // Remove the employee by his/her id by calling the employee services
        let filesremoveObj = await Files.destroy({ where: { id: id } });
        return response(OK, "Files removed successfully", filesremoveObj);

    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}