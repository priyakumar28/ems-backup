const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    reports: Reports
} } = require('../../models');


const reports = require('../../resources/reports')

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        let reportsGetByIdObj = await Reports.findOne({ where: { id: id } });
        // Return educations by his/her id by calling the educations services
        return response(OK, "reports based on id", reports.transform(reportsGetByIdObj));
    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let createReportsObj = await Reports.create(payload);
        // Create new education by calling the education services and return response
        return response(OK, "New reports created", createReportsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let updateReportsObj = await Reports.update(payload, { where: { id: id }, returning: true });
        updateReportsObj = (await this.getById(id)).data;
        // Update an educations by calling the educations services and return response
        return response(OK, "existing reports updated", updateReportsObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // Educations.list
        let listReportsObj = await Reports.findAll({
            order: [['id', 'DESC']],
        });
        // Return educations list by calling the educations services
        return response(OK, "list of educations", reports.transformCollection(listReportsObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // Educations.Destroy (is not exactly delete, like setting deleted flag)
        let removeReportsObj = await Reports.destroy({ where: { id: id } });
        // Remove the educations by his/her id by calling the educations services
        return response(OK, "remove  based on id", removeReportsObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}