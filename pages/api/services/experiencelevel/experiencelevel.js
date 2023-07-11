const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    experiencelevel: Experiencelevel
} } = require('../../models');

const experiencelevel = require('../../resources/experiencelevel');

exports.getById = async (id) => {
    try {

        let experiencelevelObj = await Experiencelevel.findOne({ where: { id: id } });
        return response(OK, "New experiencelevel id", experiencelevelObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let experiencelevelObj = await Experiencelevel.create(payload);
        experiencelevelObj = experiencelevel.transform(experiencelevelObj);
        return response(OK, "New experiencelevel created", experiencelevelObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let experiencelevelObj = await Experiencelevel.update(payload, { where: { id: id }, returning: true });
        experiencelevelObj = (await this.getById(id)).data;
        return response(OK, "New experiencelevel updated", experiencelevelObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let experiencelevelObj = await Experiencelevel.destroy({ where: { id: id } });
        return response(OK, "New experiencelevel removed", experiencelevelObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {

        let experiencelevelObj = await Experiencelevel.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "New experiencelevel list", experiencelevelObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}
