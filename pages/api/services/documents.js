
const { OK, INTERNAL_SERVER_ERROR } = require('../config/status_codes')
const { models:
    {
        documents: Documents
    } } = require('../models');
const documentsResource = require('../resources/documents')

exports.getById = async (id) => {

    try {
        let documentsObj = await Documents.findOne({
            where: { id: id },
            include: ["employeedocuments", "employerdocuments"],
        });
        return response(OK, "Documents are Received", documentsResource.transform(documentsObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.create = async (payload) => {
    try {
        let documentsObj = await Documents.create(payload);
        return response(OK, "Documents are created", documentsObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};
exports.list = async () => {
    try {
        let documentsObj = await Documents.findAll({
            include: ["employeedocuments", "employerdocuments"],
            order: [["id", "DESC"]],
        });
        return response(OK, "documents are Retrived", documentsResource.transform(documentsObj));

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let documentsObj = await Documents.update(payload, { where: { id: id }, returning: true });
        documentsObj = (await this.getById(id)).data;
        return response(OK, "Updated", documentsObj);

    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.remove = async (id) => {
    try {
        let documentsObj = await Documents.destroy({ where: { id: id } });
        return response(OK, "documents are deleted", documentsObj);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
}
const response = (code, message, data = {}) => {
    return { code, message, data };
}