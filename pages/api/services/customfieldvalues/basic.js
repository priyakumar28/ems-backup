const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    customfieldvalues: Customfieldvalues
} } = require('../../models');
const customfieldvaluesResource = require('../../resources/customfieldvalues');

exports.getById = async (id) => {
    try {

        // Return Customfieldvalues by his/her id by calling the Customfieldvalues services
        let customfieldvalueObj = await Customfieldvalues.findOne({ where: { id: id } });
        if (!customfieldvalueObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        return response(OK, "Got Data by given Id", customfieldvaluesResource.transform(customfieldvalueObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let customfieldvalueObj = await Customfieldvalues.create(payload);
        // Create new customfield value by calling the customfield services and return response
        customfieldvalueObj = customfieldvaluesResource.transform(customfieldvalueObj);
        return response(OK, "New Customfield values Created", customfieldvalueObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        // customfieldvalues.update
        // Update an customfield value by calling the customfield services and return response

        let customfieldvalueObj = await Customfieldvalues.update(payload, { where: { id: id }, returning: true });
        if (!customfieldvalueObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        customfieldvalueObj = (await this.getById(id)).data;
        return response(OK, "Customfield values updated", customfieldvalueObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        // Return customfield value list by calling the customfield services
        let customfieldvalueObj = await Customfieldvalues.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "Customfieldvalues List Found", customfieldvaluesResource.transformCollection(customfieldvalueObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message)
    }
};

exports.remove = async (id) => {
    try {
        // customfieldvalue.Destroy (is not exactly delete, like setting deleted flag)
        // Remove the customfieldvalue by his/her id by calling the customfieldvalue services
        let customfieldvalueObj = await Customfieldvalues.destroy({ where: { id: id } });
        return response(OK, "Custom field Removed", customfieldvalueObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}