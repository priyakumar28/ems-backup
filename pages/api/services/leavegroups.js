const {  OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR  } = require('../config/status_codes');
const { models: {
    leavegroups: Leavegroups
} } = require('../models');
const leavegroupResource = require('../resources/leavegroups');

exports.getById = async (id) => {
    try {
        let reqLeavegroup = await Leavegroups.findOne({ where: {id:id} });
        if(!reqLeavegroup){
            return response(NOT_FOUND, "reqLeavegroup not found", reqLeavegroup);
        }
        return response(OK, "LeavegroupDetail", leavegroupResource.transform(reqLeavegroup));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {

        let leavegroupObj = await Leavegroups.create(payload);
        return response(OK, "New leavegroup created", leavegroupResource.transform(leavegroupObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let leavegroupObj = await Leavegroups.findOne({ where: { id: id } });
        if(!leavegroupObj){
            return response(NOT_FOUND, "reqLeavegroup not found", leavegroupObj);
        }

        leavegroupObj = await Leavegroups.update(payload,{ where: { id: id } });
        return response(OK, "current leavegroup updated", leavegroupResource.transform(leavegroupObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let leavegroupObj = await Leavegroups.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "list of leavegroups", leavegroupResource.transformCollection(leavegroupObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(id) => {
    try {
        let leavegroupObj = await Leavegroups.findOne({ where: { id: id } });
        if(!leavegroupObj){
            return response(NOT_FOUND, "reqLeavegroup not found", leavegroupObj);
        }
        leavegroupObj =   await Leavegroups.destroy({
            where: {
              id:id
            }
          });
        return response(OK, "current leavegroup record deleted", leavegroupObj);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}