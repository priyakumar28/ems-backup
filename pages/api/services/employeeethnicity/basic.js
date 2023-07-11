const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employeeethnicity: Employeeethnicity
} } = require('../../models');

const employeeEthinicityResource = require('../../resources/employeeethnicity');

exports.create = async (payload) => {
    try {
        let employeeEthnicityObj = await Employeeethnicity.create(payload);
        employeeEthnicityObj = employeeEthinicityResource.transform(employeeEthnicityObj);
        return response(OK, "new employeeethnicity created", employeeEthnicityObj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.getById = async (id) => {
    try {
        let employeeEthnicityObj = await Employeeethnicity.findOne({
            where: { id: id },
            include: ['employee_employee', "ethnicity_ethnicity"]
        });
        employeeEthnicityObj = employeeEthinicityResource.transform(employeeEthnicityObj);
        return response(OK, "getting data individually through id", employeeEthnicityObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.update = async (payload, id) => {
    try {
        let employeeEthnicityObj = await Employeeethnicity.update(payload, { where: { id: id }, returning: true });
        employeeEthnicityObj = (await this.getById(id)).data;
        return response(OK, "row updated", employeeEthnicityObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let employeeEthnicityObj = await Employeeethnicity.destroy({ where: { id: id } });
        return response(OK, "row deleted", employeeEthnicityObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeEthnicityObj = await Employeeethnicity.findAll({
            include: [
                "employee_employee",
                "ethnicity_ethnicity"
            ],
            order: [['id', 'DESC']]
        });
        return response(OK, "finding the data", employeeEthinicityResource.transformCollection(employeeEthnicityObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}
