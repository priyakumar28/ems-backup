const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_MODIFIED } = require('../../config/status_codes');
const { models: {
    salarycomponent: SalaryComponent,
} } = require('../../models');

const salarycomponent_resource = require('../../resources/salarycomponent')

exports.getById = async (id) => {
    try {
        
        let salarycomponentObj = await SalaryComponent.findOne({include:['employee_employee','leave_group_leavegroup']},{where: {id: id}});

        if(!salarycomponentObj)
        {
            return response(NOT_FOUND,`The salary component document of id ${id} is not found`);
    }
        //Finds the specific record with the id and returns response
        return response(OK,"salary component record foundyou're looking for is found",salarycomponent_resource.transform(salarycomponentObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let salarycomponentObj =await SalaryComponent.create(payload);
        //Creates a new leave type by calling the leavetypes services and returns response
        return response(OK,"New Leave Rule created",salarycomponentObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let salarycomponentObj = await SalaryComponent.update(payload,{where: {id: id}});

        if(!salarycomponentObj)
        {
            return response(NOT_FOUND,`The leave group employees of id ${id} does not exist`);
        }
        //Updates the existing leave type by calling the leave types services and returns response
        return response(OK,"Existing Leave Rule updated",salarycomponentObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let salarycomponentObj = await SalaryComponent.findAll({
            include: ['componenttype_salarycomponenttype'],
            order: [['id', 'DESC']]
        });
        // Lists all the existing salary component records and returns a response
        return response(OK,"Here's a list of all the existing salarycomponent",salarycomponent_resource.transformCollection(salarycomponentObj))
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {
        let salarycomponentObj = await SalaryComponent.destroy({where : {id: id}});
        if(!salarycomponentObj)
        {
            return response(NOT_FOUND,`The record of id ${id} does not exist`);
    }

        // Deletes the specific leave type with given  and returns a response
        return response(OK,"The specific leave rule was deleted successfully",salarycomponentObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}