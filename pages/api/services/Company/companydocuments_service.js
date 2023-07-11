const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_MODIFIED } = require('../../config/status_codes');
const { models: {
    companydocuments: CompanyDocuments,
} } = require('../../models');

const companydocuments_resource = require('../../resources/companydocuments');

exports.getById = async (id) => {
    try {
        
        let companydocumentsObj = await CompanyDocuments.findOne({where: {id: id}});

        if(!companydocumentsObj)
        {
            return response(NOT_FOUND,`The company documents of id ${id} is not found`);
    }
        //Finds the specific leave type with the id and returns response
        return (OK,"Showing details for your requested id",companydocuments_resource.transform(companydocumentsObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let companydocumentsObj = await CompanyDocuments.create(payload);
        //Creates a new company document by calling the companydocuments services and returns response
        return response(OK,"Company documents hasbeen created",companydocumentsObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let companydocumentsObj = await CompanyDocuments.update(payload,{where: {id: id}});

        if(!companydocumentsObj)
        {
            return response(NOT_FOUND,`The company document of id ${id} does not exist`);
        }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Company documents details has been updated",companydocumentsObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let companydocumentsObj = await CompanyDocuments.findAll({
            order: [['id', 'DESC']],
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Showing list of details for your request",companydocuments_resource.transformCollection(companydocumentsObj));
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let companydocumentsObj = await CompanyDocuments.destroy({where : {id: id}});
        if(!companydocumentsObj)
        {
            return response(NOT_FOUND,`The company document record of id ${id} does not exist`);
    }

        // Deletes the specific leave type with given  and returns a response
        return response(OK,"Company documents details has been deleted",companydocumentsObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}