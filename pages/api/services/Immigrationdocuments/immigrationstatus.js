const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: { immigrationstatus: ImmigrationStatus}} = require('../../models');

const immigrationstatus_resource = require('../../resources/immigrationstatus')

exports.getById = async (id) => {
    try {
        let immigrationstatusObj = await ImmigrationStatus.findOne({where : {id: id}});

        if(!immigrationstatusObj)
        { 
            return response(NOT_FOUND,`The immigrations documents with id ${id} is not found`);

        }
        return response(OK,`The immigration status you're looking for is found`,immigrationstatus_resource.transform(immigrationstatusObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let immigrationstatusObj = await ImmigrationStatus.create(payload);

        return response(OK,`New immigration status record created`,immigrationstatusObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id,payload) => {
    try {
        let immigrationstatusObj = await ImmigrationStatus.update(payload,{where: {id: id}});

        if(!immigrationstatusObj)
        {
            return response(NOT_FOUND,`The immigration status record if id ${id} does not  exist`);
        }

        return response(OK,`Existing  immigration status of id ${id} is updated`,immigrationstatusObj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let immigrationstatusObj = await ImmigrationStatus.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK,`Here's a list of all the existing immigration status records
`,immigrationstatus_resource.transformCollection(immigrationstatusObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.remove = async (id) => {
    try {
        let immigrationstatusObj = await ImmigrationStatus.destroy({where: {id: id}});
        if(!immigrationstatusObj)
        { 
            return response(NOT_FOUND,`The immigration status record if id ${id} is not found`);
        }

        return (OK, `The specific immigration doc record of ${id} was deleted successfully`,immigrationstatusObj);
        
    } catch (error) {
        
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}