const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    employementtype: Employementtype
} } = require('../../models');
const employementtype = require('../../resources/employementtype');

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        let employementtypeGetByIdObj = await Employementtype.findOne({ where: { id: id } });
        // Return employementtype by his/her id by calling the employementtype services
        return response(OK, "employementtype based on id", employementtype.transform(employementtypeGetByIdObj));
    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let employementtypeObj = await Employementtype.create(payload);
        // Create new employementtype by calling the employementtype services and return response
        return response(OK, "New employee created", employementtypeObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let employementtypeUpdateObj = await Employementtype.update(payload, { where: { id: id }, returning: true });
        employementtypeUpdateObj = (await this.getById(id)).data;
        // Update an employementtype by calling the employementtype services and return response
        return response(OK, "existing employementtype updated", employementtypeUpdateObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // Educations.list
        let employementtypeListObj = await Employementtype.findAll({
            order: [['id', 'DESC']],
        });
        // Return employementtype list by calling the employementtype services
        return response(OK, "list of employementtype", employementtype.transformCollection(employementtypeListObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // Educations.Destroy (is not exactly delete, like setting deleted flag)
        let employementtypeRemoveIdObj = await Employementtype.destroy({ where: { id: id } });
        // Remove the employementtype by his/her id by calling the employementtype services
        return response(OK, "remove  based on id", employementtypeRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}