const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: { tags: Tags}} = require('../../models');

const tags_resource = require('../../resources/tags')

exports.getById = async (id) => {
    try {
        let tagsObj = await Tags.findOne({where : {id: id}});

        if(!tagsObj)
        { 
            return response(NOT_FOUND,`The tag record with id ${id} is not found`);

        }
        return response(OK,`The tag record you're looking for is found`,tags_resource.transform(tagsObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let tagsObj = await Tags.create(payload);

        return response(OK,`New tag record created`,tagsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (id,payload) => {
    try {
        let tagsObj = await Tags.update(payload,{where: {id: id}});

        if(!tagsObj)
        {
            return response(NOT_FOUND,`The tag record if id ${id} does not  exist`);
        }

        return response(OK,`Existing  tag recordof id ${id} is updated`,tagsObj)
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.list = async () => {
    try {
        let tagsObj = await Tags.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK,`Here's a list of all the existing tag records`,tags_resource.transformCollection(tagsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.remove = async (id) => {
    try {
        let tagsObj = await Tags.destroy({where: {id: id}});
        if(!tagsObj)
        { 
            return response(NOT_FOUND,`The tag record if id ${id} is not found`);
        }

        return (OK, `The specific tag record of ${id} was deleted successfully`,tagsObj);

    } catch (error) {
        
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}