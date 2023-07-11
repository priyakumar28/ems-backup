
const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    industry: Industry
} } = require('../../models');

const industry = require('../../resources/industry');

exports.getById = async (id) => {
    try {
        let industryObj = await Industry.findOne({ where: { id: id } });
        return response(OK, " Industry id is", industryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.create = async (payload) => {
    try {
        let industryObj = await Industry.create(payload);
        industryObj = industry.transform(industryObj);
        return response(OK, " Industry  is granted", industryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let industryObj = await Industry.update(payload, { where: { id: id }, returning: true });
        industryObj = (await this.getById(id)).data;
        return response(OK, " Industry is successfully updated", industryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let industryObj = await Industry.destroy({ where: { id: id } });
        return response(OK, "Industry is successfully deleted", industryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.list = async () => {
    try {
        let industryObj = await Industry.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "industry list is here ", industryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};


const response = (code, message, data = {}) => {
    return { code, message, data };
};
