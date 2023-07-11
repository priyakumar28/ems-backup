const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../config/status_codes');
const { models: {
    employeelanguages: EmployeeLanguages,
} } = require('../../models');

const employeelanguages_resource = require('../../resources/employeelanguages')

exports.getById = async (id) => {
    try {
        
        let employeelanguagesObj = await EmployeeLanguages.findOne({include: ['language','employee_employee']},{where: {id: id}},
            {
                include: [
                'languages',
                'employees'
            ]
        });

        if(!employeelanguagesObj)
        {
            return response(NOT_FOUND,`The employee language details of id ${id} is not found`);
    }
        //Finds the specific employee language with the id and returns response
        return response(OK,"The employee language details you're looking for is found",employeelanguages_resource.transform(employeelanguagesObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.create = async (payload) => {

    try{
        let employeelanguagesObj = await EmployeeLanguages.create(payload);
        //Creates a new document by calling the employeelanguages services and returns response
        return response(OK," New employee language created",employeelanguagesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
   
};

exports.update = async (id, payload) => {
    try {

        let employeelanguagesObj = await EmployeeLanguages.update(payload,{where: {id: id}});

        if(!employeelanguagesObj)
        {
            return response(NOT_FOUND,`The employee language of id ${id} does not exist`);
        }
        //Updates the existing employee language by calling the leave types services and returns response
        return response(OK,`Existing employee language doc of id ${id} updated`,employeelanguagesObj)

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
        // Return exception
    }
};

exports.list = async () => {
    try {
        let employeelanguagesObj = await EmployeeLanguages.findAll({
            include: ['language', 'employee_employee'],
            order: [['id', 'DESC']]
        });
        // Lists all the existing employee language doc and returns a response
        return response(OK,"Here's a list of all the existing employee language details",employeelanguages_resource.transformCollection(employeelanguagesObj))
        
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

exports.remove = async (id) => {
    try {

        let employeelanguagesObj = await EmployeeLanguages.destroy({where : {id: id}});
        if(!employeelanguagesObj)
        {
            return response(NOT_FOUND,`The employee language doc of id ${id} does not exist`);
    }

        // Deletes the specific employee language with given  and returns a response
        return response(OK,"The specific employee language doc was deleted successfully",employeelanguagesObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR,error.message);
        // Return exception
    }
};

const response = (code, message, data = {}) => {
    return {code, message, data};
}