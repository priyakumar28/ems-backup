const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_MODIFIED } = require('../../config/status_codes');
const { models: {
    companystructures: CompanyStructure,
} } = require('../../models');

const companystructures_resource = require('../../resources/companystructures');

exports.getById = async (id) => {
    try {
        
        let companystructuresObj = await CompanyStructure.findOne({where: {id: id}},
            {
                include:'companystructures'
            });

        if(!companystructuresObj)
        {
            return response(NOT_FOUND,`The company structure details of id ${id} is not found`);
    }
        //Finds the specific leave type with the id and returns response
        return (OK,"The company structure details you're looking for is found",companystructures_resource.transform(companystructuresObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let companystructuresObj = await CompanyStructure.create(payload);
        //Creates a new document by calling the companystructures services and returns response
        return response(OK," New company structure created",companystructuresObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let companystructuresObj = await CompanyStructure.update(payload,{where: {id: id}});

        if(!companystructuresObj)
        {
            return response(NOT_FOUND,`The company structure of id ${id} does not exist`);
        }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,`Existing company structure doc of id ${id} updated`,companystructuresObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let companystructuresObj = await CompanyStructures.findAll({
            include: 'companystructures',
            order: [['id', 'DESC']]
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Here's a list of all the existing company loan details",companystructures_resource.transformCollection(companystructuresObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let companystructuresObj = await CompanyStructure.destroy({where : {id: id}});
        if(!companystructuresObj)
        {
            return response(NOT_FOUND,`The company loan doc of id ${id} does not exist`);
    }

        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific company loan doc was deleted successfully",companystructuresObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}