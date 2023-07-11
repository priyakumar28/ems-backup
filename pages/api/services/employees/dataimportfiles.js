    const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    dataimportfiles: Dataimportfiles
} } = require('../../models');
const dataimportfilesResources = require('../../resources/dataimportfiles');

exports.getById = async (id) => {
    try {

        // return dataimports by his/her id by calling the employee services
        let dataimportfiles = await Dataimportfiles.findOne({ where: { id: id } });
            if (!dataimportfiles) {
                return response(BAD_REQUEST, "data with given id " + id + " is not found");
            }

        return response(OK, "dataimportfiles get by the id", dataimportfilesResources.transform(dataimportfiles));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};



exports.create = async (payload) => {
    try {
        let dataimportfilesObj = await Dataimportfiles.create(payload);
        //Create new dataimportfiles by calling the dataimportfiles services and return response
        dataimportfilesObj = dataimportfilesResources.transform(dataimportfilesObj);

        return response(OK, "New dataimportfiles created", dataimportfilesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.update = async (payload, id) => {
    try {
        let dataimportfileupdateObj = await Dataimportfiles.findOne({ where: { id: id } });

        if (!dataimportfileupdateObj) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }

        await Dataimportfiles.update(payload, { where: { id: id }, returning: true });
        dataimportfileupdateObj = (await this.getById(id)).data;
        return response(OK, "Dataimportfile Successfully Updated", dataimportfileupdateObj);

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async (payload) => {
    try {
        let dataimportfilelistObj = await Dataimportfiles.findAll(payload);

        return response(OK, "list of dataimportfile", dataimportfilesResources.transformCollection(dataimportfilelistObj));

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.remove = async (id) => {
    try {
        let dataimportfileremove = await Dataimportfiles.destroy({ where: { id: id } });
        if (!dataimportfileremove) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }
        return response(OK, "dataimportfile successfully deleted", dataimportfileremove);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}