const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    crons: Crons
} } = require('../../models');
const cronsResource = require('../../resources/crons');

exports.getById = async (id) => {
    try {

        // Return Crons by his/her id by calling the Crons services
        let cronObj = await Crons.findOne({ where: { id: id } });
        if (!cronObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        return response(OK, "Got Data by given Id", cronsResource.transform(cronObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let cronObj = await Crons.create(payload);
        // Create new Cron by calling the Cron services and return response
        return response(OK, "New cron Created", cronObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        // Update an Cron by calling the Cron services and return response

        let cronObj = await Crons.update(payload, { where: { id: id }, returning: true });
        if (!cronObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        cronObj = (await this.getById(id)).data;
        return response(OK, "cron updated", cronObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // Cron.list
        // Return Cron list by calling the Cron services
        let cronObj = await Crons.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "Crons List Found", cronsResource.transformCollection(cronObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message)
    }
};

exports.remove = async (id) => {
    try {
        // EmployeesDependent.Destroy (is not exactly delete, like setting deleted flag)
        // Remove the employee by his/her id by calling the employee services
        let cronObj = await Crons.destroy({ where: { id: id } });
        return response(OK, "cron Removed", cronObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}