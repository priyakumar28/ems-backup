const {  OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR  } = require('../config/status_codes');
const { models: {
    employeeleaves: Employeeleaves
} } = require('../models');
const employeeleaveResource = require('../resources/employeeleaves');

exports.getById = async (id) => {
    try {
        let employeeleaveObj = await Employeeleaves.findOne(
            {include:

                ['employee_leave_employeeleave','user']
            } ,{ where: {id:id} });
        if(!employeeleaveObj){
            return response(NOT_FOUND, "employeeleaveObj not found", employeeleaveObj);
        }
        return response(OK, "employeeleaveDetail", employeeleaveResource.transform(employeeleaveObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {

        let employeeleaveObj = await Employeeleaves.create(payload);
        return response(OK, "New employeeleave created", employeeleaveResource.transform(employeeleaveObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let employeeleaveObj = await Employeeleaves.findOne({ where: {id:id} });
        if(!employeeleaveObj){
            return response(NOT_FOUND, "employeeleaveObj not found", employeeleaveObj);
        }
        employeeleaveObj = await Employeeleaves.update(payload,{ where: { id: id } });
        return response(OK, "current employeeleave updated", employeeleaveResource.transform(employeeleaveObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let employeeleaveObj = await Employeeleaves.findAll(
            {include:

                ['employee_leave_employeeleave', 'user'],
                order: [['id', 'DESC']],
            }   
        );
        return response(OK, "list of Employeeleaves", employeeleaveResource.transformCollection(employeeleaveObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(idn) => {
    try {
        let employeeleaveObj = await Employeeleaves.findOne({ where: {id:id} });
        if(!employeeleaveObj){
            return response(NOT_FOUND, "employeeleaveObj not found", employeeleaveObj);
        }
        employeeleaveObj =   await Employeeleaves.destroy({
            where: {
              id:idn
            }
          });
          return response(OK, "current employeeleave record deleted", employeeleaveObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}