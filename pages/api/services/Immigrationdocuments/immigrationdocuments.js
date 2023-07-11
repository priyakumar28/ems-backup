const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: { immigrationdocuments: ImmigrationDocuments}} = require('../../models');

const immigrationdocuments_resource = require('../../resources/immigrationdocuments')

exports.getById = async (id) => {
    try {
        let immigrationdocumentsObj = await ImmigrationDocuments.findOne({where : {id: id}});

        if(!immigrationdocumentsObj)
        { 
            return response(NOT_FOUND,`The immigrations documents with id ${id} is not found`);

        }
        return response(OK,`The immigration document you're looking for is found`,immigrationdocuments_resource.transform(immigrationdocumentsObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let immigrationdocumentsObj = await ImmigrationDocuments.create(payload);

        return response(OK,`New immigration document record created`,immigrationdocumentsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id,payload) => {
    try {
        let immigrationdocumentsObj = await ImmigrationDocuments.update(payload,{where: {id: id}});

        if(!immigrationdocumentsObj)
        {
            return response(NOT_FOUND,`The immigration document record if id ${id} does not  exist`);
        }

        return response(OK,`Existing  immigration document of id ${id} is updated`,immigrationdocumentsObj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let immigrationdocumentsObj = await ImmigrationDocuments.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK,`Here's a list of all the existing immigration documents`,immigrationdocuments_resource.transformCollection(immigrationdocumentsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.remove = async (id) => {
    try {
        let immigrationdocumentsObj = await ImmigrationDocuments.destroy({where: {id: id}});
        if(!immigrationdocumentsObj)
        { 
            return response(NOT_FOUND,`The immigration document record if id ${id} is not found`);
        }

        return response(OK, `The specific immigration doc record of ${id} was deleted successfully`,immigrationdocumentsObj);

    } catch (error) {
        
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}