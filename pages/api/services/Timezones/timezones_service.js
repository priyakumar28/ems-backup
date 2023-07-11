const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: { timezones: Timezones}} = require('../../models');

const timezones_resource = require('../../resources/timezones')

exports.getById = async (id) => {
    try {
        let timezonesObj = await Timezones.findOne({where : {id: id}});

        if(!timezonesObj)
        { 
            return response(NOT_FOUND,`The timezones with id ${id} is not found`);

        }
        return response(OK,`The timezone you're looking for is found`,timezones_resource.transform(timezonesObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let timezonesObj = await Timezones.create(payload);

        return response(OK,`New timezones record created`,timezonesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id,payload) => {
    try {
        let timezonesObj = await Timezones.update(payload,{where: {id: id}});

        if(!timezonesObj)
        {
            return response(NOT_FOUND,`The timezones record if id ${id} does not  exist`);
        }

        return response(OK,`Existing  timezones of id ${id} is updated`,timezonesObj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let timezonesObj = await Timezones.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK,`Here's a list of all the existing timezones records`,timezonesObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.remove = async (id) => {
    try {
        let timezonesObj = await Timezones.destroy({where: {id: id}});
        if(!timezonesObj)
        { 
            return response(NOT_FOUND,`The timezones record if id ${id} is not found`);
        }

        return (OK, `The specific timezone record of ${id} was deleted successfully`,timezonesObj);
        
    } catch (error) {
        
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}