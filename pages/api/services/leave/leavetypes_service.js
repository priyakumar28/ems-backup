const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const leavetype_resource = require('../../resources/leavetypes.js')
const { models: {
    leavetypes: LeaveTypes
} } = require('../../models');

exports.getById = async (id) => {
    try {
        let leavetypeObj = await LeaveTypes.findOne({where: {id:id}});
        if(!leavetypeObj){
            return response(NOT_FOUND,`The leave type record you're looking for is not found`)
        }
        //Finds the specific leave type with the id and returns response
        return response(OK,"Leave type you're looking for is found",leavetype_resource.transform(leavetypeObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let leavetypeObj = await LeaveTypes.create(payload);
        //Creates a new leave type by calling the leavetypes services and returns response
        return response(OK,"New Leave Type created",leavetypeObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {
        let leavetypeObj = await LeaveTypes.update(payload,{where: {id: id}});
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing Leave type updated",leavetypeObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let leavetypeObj = await LeaveTypes.findAll({
            order: [['id', 'DESC']],
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Here's a list of all the existing leave types",leavetype_resource.transformCollection(leavetypeObj))
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let leavetypeObj = await LeaveTypes.destroy({where : {id:id}});
        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific leave type was deleted successfully",leavetypeObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}