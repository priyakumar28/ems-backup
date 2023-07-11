const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    supportedlanguages: SupportedLanguages,
} } = require('../../models');

const supportedlanguages_resource = require('../../resources/supportedlanguages')

exports.getById = async (id) => {
    try {
        
        let supportedlanguagesObj = await SupportedLanguages.findOne({where: {id: id}});

        if(!supportedlanguagesObj)
        {
            return response(BAD_REQUEST,`The company loan details of id ${id} is not found`);
    }
        //Finds the specific supported language details with the id and returns response
        return response(OK,`The suppoted language details of id ${id} is found`,supportedlanguages_resource.transform(supportedlanguagesObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let supportedlanguagesObj = await SupportedLanguages.create(payload);
        //Creates a new supported language record by calling the companydocuments services and returns response
        return response(OK," New supported language doc created",supportedlanguagesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let supportedlanguagesObj = await SupportedLanguages.update(payload,{where: {id: id}});

        if(!supportedlanguagesObj)
        {
            return response(NOT_FOUND,`The supported language doc of id ${id} does not exist`);
        }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing company loan doc updated",supportedlanguagesObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let supportedlanguagesObj = await SupportedLanguages.findAll({
            order: [['id', 'DESC']],
        });
        // Lists all the existing supported language and returns a response
        return response(OK,"Here's a list of all the existing company loan details",supportedlanguages_resource.transformCollection(supportedlanguagesObj))
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let supportedlanguagesObj = await SupportedLanguages.destroy({where : {id: id}});
        if(!supportedlanguagesObj)
        {
            return response(NOT_FOUND,`The supported langauge doc of id ${id} does not exist`);
    }

        // Deletes the specific supported language with given and returns a response
        return response(OK,"The specific supported language doc was deleted successfully",supportedlanguagesObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}