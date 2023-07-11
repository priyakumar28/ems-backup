const {  OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR  } = require('../../config/status_codes');
const { models: {
    userreports: Userreports
} } = require('../../models');
const userreportsResource = require('../../resources/userreports');


exports.getById = async (id) => {
    try {
        let userreportObj = await Userreports.findOne({ where: {id:id} });
        
        if(!userreportObj){
            return response(NOT_FOUND, "req userreport not found", userreportsResource.transform(userreportObj));
        }
        return response(OK, "userDetail", userreportObj);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {

        let userreportObj = await Userreports.create(payload);
        return response(OK, "New userreport created", userreportsResource.transform(userreportObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let userreportObj = await Userreports.findOne({ where: { id: id } });
        if(!userreportObj){
            return response(NOT_FOUND, "req userreport not found", userreportObj);
        }

        userreportObj = await Userreports.update(payload,{ where: { id: id } });
        return response(OK, "current userreport updated", userreportsResource.transform(userreportObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let userreportObj = await Userreports.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Userreports", userreportsResource.transformCollection(userreportObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(id) => {
    try {
        let userreportObj = await Userreports.findOne({ where: { id: id } });
        if(!userreportObj){
            return response(NOT_FOUND, "req userreport not found", userreportObj);
        }
        userreportObj =   await Userreports.destroy({
            where: {
              id:id
            }
          });
        return response(OK, "current userreport record deleted", userreportsResource.transform(userreportObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}