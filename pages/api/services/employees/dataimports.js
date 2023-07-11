const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    dataimport: Dataimport
} } = require('../../models');
const dataimportResources = require('../../resources/dataimport');

exports.getById = async (id) => {
    try {

        // return dataimports by his/her id by calling the employee services
        let dataimport = await Dataimport.findOne({ where: { id: id } });
        if (!dataimport) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }

        return response(OK, "dataimport get by the id", dataimportResources.transform(dataimport));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



exports.create = async (payload) => {
    try {
        let dataimportObj = await Dataimport.create(payload);
        //Create new dataimports by calling the dataimports services and return response
        dataimportObj = dataimportResources.transform(dataimportObj);

        return response(OK, "New dataimport created", dataimportObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.update = async (payload, id) => {
    try {
        let dataimportupdateObj = await Dataimport.findOne({ where: { id: id } });

        if (!dataimportupdateObj) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }
        dataimportupdateObj = await Dataimport.update(payload, { where: { id: id }, returning: true });
        dataimportupdateObj = (await this.getById(id)).data;

        return response(OK, "Dataimport Successfully Updated", dataimportupdateObj);

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async (payload) => {
    try {
        let dataimportlistObj = await Dataimport.findAll(payload);

        return response(OK, "list of dataimport", dataimportResources.transformCollection(dataimportlistObj));

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.remove = async (id) => {
    try {
        let dataimportremove = await Dataimport.destroy({ where: { id: id } });
        if (!dataimportremove) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }
        return response(OK, "dataimport successfully deleted", dataimportremove);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}