const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    educationlevel: Educationlevel
} } = require('../../models');
const educationlevel = require('../../resources/educationlevel')

exports.getById = async (id) => {
    try {
        // await Employees.findById(id)
        let educationlevelGetByIdObj = await Educationlevel.findOne({ where: { id: id } });
         if (!educationlevelGetByIdObj) {
           return response(
             BAD_REQUEST,
             "data with given id " + id + " is not found"
           );
         }
        // Return educations by his/her id by calling the educations services
        return response(OK, "education based on id", educationlevel.transform(educationlevelGetByIdObj));
    } catch (error) {
        // Return exception
    }
};

exports.create = async (payload) => {
    try {
        let educationlevelObj = await Educationlevel.create(payload);
        educationlevelObj = educationlevel.transform(educationlevelObj);
        // Create new educationlevel by calling the educationlevel services and return response
        return response(OK, "New education level created", educationlevelObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // Employees.update
        let educationlevelUpdateObj = await Educationlevel.update(payload, { where: { id: id }, returning: true });
        educationlevelUpdateObj = (await this.getById(id)).data;
        // Update an educationlevel by calling the educationlevel services and return response
        return response(OK, "existing educationlevel updated", educationlevelUpdateObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // Educations.list
        let educationlevelListObj = await Educationlevel.findAll({
            order: [['id', 'DESC']],
        });
        // Return educationlevel list by calling the educationlevel services
        return response(OK, "list of educationlevel", educationlevel.transformCollection(educationlevelListObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        // Educations.Destroy (is not exactly delete, like setting deleted flag)
        let educationlevelRemoveIdObj = await Educationlevel.destroy({ where: { id: id } });
        // Remove the educationlevel by his/her id by calling the educationlevel services
        return response(OK, "remove  based on id", educationlevelRemoveIdObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}