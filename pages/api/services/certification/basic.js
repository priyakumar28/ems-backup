const { OK, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    certifications: Certifications

} } = require('../../models');

const certificationResource = require('../../resources/certification')

exports.getById = async (id) => {
    try {
        let certificationObj = await Certifications.findOne({ where: { id: id } });

        return response(OK, "Showing details for your requested id", certificationResource.transform(certificationObj))

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let certificationObj = await Certifications.create(payload);
        certificationObj = certificationResource.transform(certificationObj);
        return response(OK, "New Certification has been created", certificationObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.update = async (id, payload) => {
    try {
        let certificationObj = await Certifications.update(payload, { where: { id: id }, returning: true });
        certificationObj = (await this.getById(id)).data;
        return response(OK, "Certification details has been updated", certificationObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.list = async () => {
    try {
        let certificationObj = await Certifications.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "Showing list of details for your request", certificationResource.transformCollection(certificationObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let certificationObj = await Certifications.destroy({ where: { id: id } });
        return response(OK, "Certification details has been deleted", certificationObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}

