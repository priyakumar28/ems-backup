const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    reportfiles: Reportfiles
} } = require('../../models');

const reportfiles = require('../../resources/reportfiles');

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        let reportfilesGetByIdObj = await Reportfiles.findOne({ where: { id: id } });
        // Return educations by his/her id by calling the educations services
        return response(OK, "reports based on id", reportfiles.transform(reportfilesGetByIdObj));
    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let createReportfilesObj = await Reportfiles.create(payload);
        // Create new education by calling the education services and return response
        return response(OK, "New reports created", createReportfilesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let updateReportfilesObj = await Reportfiles.update(payload, { where: { id: id }, returning: true });
        updateReportfilesObj = (await this.getById(id)).data;
        // Update an educations by calling the educations services and return response
        return response(OK, "existing reports updated", updateReportfilesObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // Educations.list
        let listReportfilesObj = await Reportfiles.findAll({
            order: [['id', 'DESC']],
        });
        // Return educations list by calling the educations services
        return response(OK, "list of Reportfiles", reportfiles.transformCollection(listReportfilesObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // Educations.Destroy (is not exactly delete, like setting deleted flag)
        let removeReportfilesObj = await Reportfiles.destroy({ where: { id: id } });
        // Remove the educations by his/her id by calling the educations services
        return response(OK, "remove  based on id", removeReportfilesObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}