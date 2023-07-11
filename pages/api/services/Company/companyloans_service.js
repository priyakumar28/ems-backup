const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    companyloans: CompanyLoans,
} } = require('../../models');

const companyloans_resource = require('../../resources/companyloans')

exports.getById = async (id) => {
    try {
        
        let companyloansObj = await CompanyLoans.findOne({where: {id: id}});

        if(!companyloansObj)
        {
            return response(BAD_REQUEST,`The company loan details of id ${id} is not found`);
    }
        //Finds the specific leave type with the id and returns response
        return response(OK,`The company loan details of id ${id} is found`,companyloans_resource.transform(companyloansObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let companyloansObj = await CompanyLoans.create(payload);
        //Creates a new company document by calling the companydocuments services and returns response
        return response(OK," New company loan doc created",companyloansObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let companyloansObj = await CompanyLoans.update(payload,{where: {id: id}});

        if(!companyloansObj)
        {
            return response(NOT_FOUND,`The company loan doc of id ${id} does not exist`);
        }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing company loan doc updated",companyloansObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let companyloansObj = await CompanyLoans.findAll({
            order: [['id', 'DESC']],
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Here's a list of all the existing company loan details",companyloans_resource.transformCollection(companyloansObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let companyloansObj = await CompanyLoans.destroy({where : {id: id}});
        if(!companyloansObj)
        {
            return response(NOT_FOUND,`The company loan doc of id ${id} does not exist`);
    }

        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific company loan doc was deleted successfully",companyloansObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}