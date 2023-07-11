
const { OK, INTERNAL_SERVER_ERROR } = require('../config/status_codes')
const { models:
    {
        candidates: Candidates
    } } = require('../models');

const candidatesResource = require('../resources/candidates')

exports.getById = async (id) => {

    try {
        let candidatesObj = await Candidates.findOne({
          where: { id: id },
            include: ["applications", "interviews",
            ],
        });
        return response(OK, "Candidates are Received", candidatesResource.transform(candidatesObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.create = async (payload) => {
    try {
        let candidatesObj = await Candidates.create(payload);
        return response(OK, "Candidates are created", candidatesObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
exports.list = async () => {
    try {
        let candidatesObj = await Candidates.findAll({
            include: [
                "applications", "interviews",
            ],
            order: [['id', 'DESC']],
        });
        return response(OK, "Candidates are Retrived", candidatesResource.transformCollection(candidatesObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id, payload) => {
    try {
        let candidatesObj = await Candidates.update(payload, { where: { id: id }, returning: true });
        candidatesObj = (await this.getById(id)).data;
        return response(OK, "Updated", candidatesObj);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.remove = async (id) => {
    try {
        let candidatesObj = await Candidates.destroy({ where: { id: id } });
        return response(OK, "Candidates are deleted", candidatesObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
}
const response = (code, message, data = {}) => {
    return { code, message, data };
}