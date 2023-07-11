const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_MODIFIED } = require('../../config/status_codes');
const { models: {
    leavegroupemployees: LeaveGroupEmployees,
} } = require('../../models');

const leavegroupemployees_resource = require('../../resources/leavegroupemployees')

exports.getById = async (id) => {
    try {
        
        let leavegroupemployeesObj = await LeaveGroupEmployees.findOne({include:['employee_employee','leave_group_leavegroup']},{where: {id: id}});

        if(!leavegroupemployeesObj)
        {
            return response(NOT_FOUND,`The leave group employees of id ${id} is not found`);
    }
        //Finds the specific leave type with the id and returns response
        return response(OK,"Leave Rule you're looking for is found",leavegroupemployees_resource.transform(leavegroupemployeesObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let leavegroupemployeesObj =await LeaveGroupEmployees.create(payload);
        //Creates a new leave type by calling the leavetypes services and returns response
        return response(OK,"New Leave Rule created",leavegroupemployeesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let leavegroupemployeesObj = await LeaveGroupEmployees.update(payload,{where: {id: id}});

        if(!leavegroupemployeesObj)
        {
            return response(NOT_FOUND,`The leave group employees of id ${id} does not exist`);
        }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing Leave Rule updated",leavegroupemployeesObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let leavegroupemployeesObj = await LeaveGroupEmployees.findAll({
            include: ['employee_employee', 'leave_group_leavegroup'],
            order: [['id', 'DESC']]
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Here's a list of all the existing leavegroupemployees records",leavegroupemployeesObj)
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let leavegroupemployeesObj = await LeaveGroupEmployees.destroy({where : {id: id}});
        if(!leavegroupemployeesObj)
        {
            return response(NOT_FOUND,`The record of id ${id} does not exist`);
    }

        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific leave rule was deleted successfully",leavegroupemployeesObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}