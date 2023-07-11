const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_ACCEPTABLE } = require('../../config/status_codes');
const { models: {
    leaverules: LeaveRules
} } = require('../../models');
const { transformCollection } = require('../../resources/leaverules');

const leaverules_resource = require('../../resources/leaverules');

exports.getById = async (id) => {
    try {
        let leaveruleObj = await LeaveRules.findOne({where: {id: id}});
        if(leaveruleObj)
        {
            return response(NOT_FOUND,`The leave rule of id ${id} is not found`);
    }
        //Finds the specific leave type with the id and returns response
        return response(OK,"Leave Rule you're looking for is found",leaverules_resource.transform(leaveruleObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let leaveruleObj =await LeaveRules.create(payload);
        //Creates a new leave type by calling the leavetypes services and returns response
        return response(OK,"New Leave Rule created",leaveruleObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {
        let leaveruleObj = await LeaveRules.update(payload,{where: {id: id}});
        if(!leaveruleObj)
        {
            return response(NOT_FOUND,`The leave rule with id ${id} you're trying to update does not exist`);
    }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing Leave Rule updated",leaveruleObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let leaveruleObj = await LeaveRules.findAll({
            order: [['id', 'DESC']],
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Here's a list of all the existing leave rules",leaverules_resource.transformCollection(leaveruleObj))
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let leaveruleObj = await LeaveRules.destroy({where : {id: id}});
        if(!leaveruleObj){
            return response(NOT_FOUND,`The leave rule of id ${id} does not exist`)
        }
        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific leave rule was deleted successfully",leaveruleObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}