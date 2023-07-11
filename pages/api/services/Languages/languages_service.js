const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_MODIFIED } = require('../../config/status_codes');
const { models: {
    languages: Languages,
} } = require('../../models');

const languages_resource = require('../../resources/languages')

exports.getById = async (id) => {
    try {
        
        let languagesObj = await Languages.findOne({where: {id: id}});

        if(!languagesObj)
        {
            return response(NOT_FOUND,`The language of id ${id} is not found`);
    }
        //Finds the specific language with the id and returns response
        return response(OK,"The language you're looking for is found",languages_resource.transform(languagesObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let languagesObj = await Languages.create(payload);
        //Creates a new language dic by calling the languages services and returns response
        return response(OK," New language created",languagesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let languagesObj = await Languages.update(payload,{where: {id: id}});

        if(!languagesObj)
        {
            return response(NOT_FOUND,`The language record of id ${id} does not exist`);
        }
        //Updates the existing language by calling the languages services and returns response
        return response(OK,"Existing language record updated",languagesObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let languagesObj = await Languages.findAll({
            order: [['id', 'DESC']],
        });
        // Lists all the existing language and returns a response
        return response(OK,"Here's a list of all the existing languages",languages_resource.transformCollection(languagesObj))
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let languagesObj = await Languages.destroy({where : {id: id}});
        if(!languagesObj)
        {
            return response(NOT_FOUND,`The language record of id ${id} does not exist`);
    }

        // Deletes the specific language with given  and returns a response
        return response(OK,"The specific language record was deleted successfully",languagesObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}