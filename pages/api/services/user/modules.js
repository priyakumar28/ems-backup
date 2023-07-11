const { Op } = require('sequelize');
const {  OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR  } = require('../../config/status_codes');
const { models: {
    modules: Modules,
    userroles: Userroles,
    permissions:Permissions,
    modulepermissions:Modulepermissions,
    userrolemodules:Userrolemodules
} } = require('../../models');
const moduleResource = require('../../resources/modules');

exports.getById = async (id) => {
    try {
        let moduleObj = await Modules.findOne({ where: {id:id}, include: "modules_permissions" });
        
        if(!moduleObj){
            return response(NOT_FOUND, "req module not found", moduleObj);
        }
        return response(OK, "moduleDetail", moduleResource.transform(moduleObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let moduleObj = await Modules.create(payload);
        return response(OK, "New module created", moduleResource.transform(moduleObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let moduleObj = await Modules.findOne({ where: { id: id } , include:["modules_permissions"] });
        if(!moduleObj){
            return response(NOT_FOUND, "req module not found", moduleObj);
        }
        
        moduleObj = await Modules.update(payload,{ where: { id: id } , include:["modules_permissions"]});
        return response(OK, "current module updated", moduleResource.transform(moduleObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let moduleObj = await Modules.findAll({
            include: ["modules_permissions"],
            order: [['id', 'DESC']]
        });
    
        return response(OK, "list of Modules", moduleResource.transformCollection(moduleObj));
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async(id) => {
    try {
        let moduleObj = await Modules.findOne({ where: { id: id } });
        if(!moduleObj){
            return response(NOT_FOUND, "req module not found", moduleObj);
        }
        moduleObj =   await Modules.destroy({
            where: {
              id:id
            }
          });
        return response(OK, "current module record deleted", moduleObj);
    } 
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}