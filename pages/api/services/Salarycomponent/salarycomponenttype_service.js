const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_MODIFIED } = require('../../config/status_codes');
const { models: {
    salarycomponenttype: SalaryComponentType,
} } = require('../../models');

const salarycomponenttype_resource = require('../../resources/salarycomponenttype')

exports.getById = async (id) => {
    try {
        let salarycomponenttypeObj = await SalaryComponentType.findOne({where: {id: id}});
        if(!salarycomponenttypeObj)
        {
            return response(NOT_FOUND,`The salary component type record of ${id} is not found`); 
        }
        return response(OK,`The salary component type record of id ${id} is found`,salarycomponenttype_resource.transform(salarycomponenttypeObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {


    try {
        let salarycomponentObj = await SalaryComponentType.create(payload);
        
        return response(OK,`The salary component type record of id ${id} is created`, salarycomponentObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

exports.update = async (id,payload) => {
    try {
        let salarycomponentObj = await SalaryComponentType.update(payload,{where: {id: id}});
        if(!salarycomponentObj){
            return response(NOT_FOUND, `The record of id ${id} does not exist`);
        }
        return response(OK,`The record of id ${id} as been updated successfully`,salarycomponentObj);
    } catch (error) {
        
        return response( INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async () => {
    try {
        let salarycomponentObj = await SalaryComponentType.findAll({
            order: [['id', 'DESC']],
        });
        return response(OK,`Here's a list of all the salary component type records below`,salarycomponenttype_resource.transformCollection(salarycomponentObj));

    } catch (error) {
        return response( INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let salarycomponentObj = await SalaryComponentType.destroy({where : {id: id}});
        if(!salarycomponentObj){
            return response(NOT_FOUND, `The record of id ${id} does not exist`);
        }

        return response(OK,`The record if id ${id} has been deleted successfully`,salarycomponentObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}