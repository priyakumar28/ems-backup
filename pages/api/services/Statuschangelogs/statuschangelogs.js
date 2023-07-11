const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: { statuschangelogs: Statuschangelogs}} = require('../../models');

const statuschangelogs_resource = require('../../resources/statuschangelogs')

exports.getById = async (id) => {
    try {
        let statuschangelogsobj = await Statuschangelogs.findOne({where : {id: id}});

        if(!statuschangelogsobj)
        { 
            return response(NOT_FOUND,`The statuschangelogs record with id ${id} is not found`);

        }
        return response(OK,`The statuschangelog record you're looking for is found`,statuschangelogs_resource.transform(statuschangelogsobj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let statuschangelogsobj = await Statuschangelogs.create(payload);

        return response(OK,`New statuschangelog record record created`,statuschangelogsobj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id,payload) => {
    try {
        let statuschangelogsobj = await Statuschangelogs.update(payload,{where: {id: id}});

        if(!statuschangelogsobj)
        {
            return response(NOT_FOUND,`The statuschangelog record record if id ${id} does not  exist`);
        }

        return response(OK,`Existing  statuschangelog record of id ${id} is updated`,statuschangelogsobj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let statuschangelogsobj = await Statuschangelogs.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK,`Here's a list of all the existing statuschangelog records`,statuschangelogs_resource.transformCollection(statuschangelogsobj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.remove = async (id) => {
    try {
        let statuschangelogsobj = await Statuschangelogs.destroy({where: {id: id}});
        if(!statuschangelogsobj)
        { 
            return response(NOT_FOUND,`The statuschangelog record record if id ${id} is not found`);
        }

        return (OK, `The specific statuschangelog record record of ${id} was deleted successfully`,statuschangelogsobj);

    } catch (error) {
        
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}