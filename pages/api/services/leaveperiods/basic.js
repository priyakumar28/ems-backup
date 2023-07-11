const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../../config/status_codes');
const { models: {
    leaveperiods: Leaveperiods
} } = require('../../models');
const leaveperiodresource = require('../../resources/leaveperiods');



exports.getById = async (id) => {
    try {
        let reqLeaveperiod = await Leaveperiods.findOne({ where: {id:id} });
        if(!reqLeaveperiod){
            return response(NOT_FOUND, "LeavePeriodDetail not found", reqLeaveperiod);
        }
        return response(OK, "LeavePeriodDetail", leaveperiodresource.transform(reqLeaveperiod));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let leaveperiodObj = await Leaveperiods.create(payload);
        return response(OK, "New leaveperiod created", leaveperiodresource.transform(leaveperiodObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let leaveperiodObj = await Leaveperiods.findOne(payload,{ where: { id: id } });
        if(!leaveperiodObj){
            return response(NOT_FOUND, "LeavePeriodDetail not found", leaveperiodObj);
        }
        leaveperiodObj = await Leaveperiods.update(payload,{ where: { id: id } });
        return response(OK, "current leaveperiod updated", leaveperiodresource.transform(leaveperiodObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let leaveperiodObj = await Leaveperiods.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "list of leaveperiods", leaveperiodresource.transformCollection(leaveperiodObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(idn) => {
    try {
        let leaveperiodObj = await Leaveperiods.findOne({ where: {id:idn} });
        if(!leaveperiodObj){
            return response(NOT_FOUND, "LeavePeriodDetail not found", leaveperiodObj);
        }
        leaveperiodObj =   await Leaveperiods.destroy({
            where: {
              id:idn
            }
          });
          return response(OK, "current leaveperiod record deleted", leaveperiodresource.transform(leaveperiodObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}