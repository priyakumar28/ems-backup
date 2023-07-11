const {  OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR  } = require('../config/status_codes');
const { models: {
    employeeleavelog: Employeeleavelog
} } = require('../models');
const employeeleavelogResource = require('../resources/employeeleavelogs');

exports.getById = async (id) => {
    try {
        let employeeleavelogObj = await Employeeleavelog.findOne(

            {  include: 
                [
                'employee_employee',
                'leave_period_leaveperiod',
                'leave_type_leavetype'
                ]
            } ,{ 
                where: {id:id} 
            });

        if(!employeeleavelogObj){
            return response(NOT_FOUND, "employeeleavelogObj not found", employeeleavelogResource.transform(employeeleavelogObj));
        }

        return response(OK, "employeeleaveDetail", employeeleavelogObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {

        let employeeleavelogObj = await Employeeleavelog.create(payload);

        return response(OK, "New employeeleavelog created", employeeleavelogResource.transform(employeeleavelogObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let employeeleavelogObj = await Employeeleavelog.findOne(
            { 
                where: {id:id} 
            });

        if(!employeeleavelogObj){

            return response(NOT_FOUND, "employeeleavelogObj not found", employeeleavelogObj);
        }

        employeeleavelogObj = await Employeeleavelog.update(payload,{ where: { id: id } });

        return response(OK, "Employee leave updated", employeeleavelogResource.transform(employeeleavelogObj));

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeleavelogObj = await Employeeleavelog.findAll(
            { include: 
                [
                'employee_employee',
                'leave_period_leaveperiod',
                'leave_type_leavetype'
                ],
                order: [['id', 'DESC']],
            });

        return response(OK, "list of Employeeleavelog", employeeleavelogResource.transformCollection(employeeleavelogObj));

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(idn) => {
    try {

        let employeeleavelogObj = await Employeeleavelog.findOne(

            { 
                where: {id:id} 
            });
            
        if(!employeeleavelogObj){
            return response(NOT_FOUND, "employeeleavelogObj not found", employeeleavelogObj);
        }
        employeeleavelogObj =   await Employeeleavelog.destroy({
            where: {
              id:idn
            }
          });
        return response(OK, "current employeeleave record deleted", employeeleavelogObj);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}