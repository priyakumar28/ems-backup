const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: {
    employeeleavedays: EmployeeLeaveDays
} } = require('../../models');
const employeeleaves = require('../../models/employeeleaves');

exports.getById = async (id) => {
    try {
        let employeeleavedaysObj = await EmployeeLeaveDays.findOne({where: {id: id}},{include:'employee_leave_employeeleave'});
        if(!employeeleavedaysObj)
        {
            return response(NOT_FOUND,`The employee leave days of id: ${id} was not found`);
    }
        //Finds the specific leave type with the id and returns response
        return response(OK,"Leave type you're looking for is found",employeeleavedaysObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let employeeleavedaysObj =await EmployeeLeaveDays.create(payload);
        //Creates a new leave type by calling the leavetypes services and returns response
        return response(OK,"New Leave Type created",employeeleavedaysObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {
    
        let employeeleavedaysObj = await EmployeeLeaveDays.update(payload,{where: {id: id}});
        if(!employeeleavedaysObj)
        {
            return response(NOT_FOUND,`The employee leave day of id ${id} that youre trying to update does not exist`);
    }

        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing Leave type updated",employeeleavedaysObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let employeeleavedaysObj = await EmployeeLeaveDays.findAll({
            include: 'employee_leave_employeeleave',
            order: [['id', 'DESC']]
        });
        // Lists all the existing leave types and returns a response
        return response(OK,"Here's a list of all the existing leave types",employeeleavedaysObj)
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let ELDO = await EmployeeLeaveDays.findOne(payload,{where:{id:id}});
        if(!ELDO)
        {
            return response(NOT_FOUND,`The employee leave day of id ${id} that youre trying to delete does not exist`);
        }
        let employeeleavedaysObj = await EmployeeLeaveDays.destroy({where : {id: id}});
        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific leave type was deleted successfully",employeeleavedaysObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}