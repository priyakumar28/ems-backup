const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    userroles: Userroles,
    users: User,
    employeedatahistory: Employeedatahistory
} } = require('../../models');
const datahistoryResources = require('../../resources/employeedatahistory');

// return employeedathistory by his/her id by calling the employeedatahistory services
exports.getById = async (id) => {
    try {
        let employeedatahistory = await Employeedatahistory.findOne({
            where: { id: id },
            include: [
                {
                    model: User,
                    as: 'user',
                    include: [{
                        model: Userroles,
                        as: "users_userroles"
                    }]

                },
                'employee'
            ]

        });
        if (!employeedatahistory) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }

        return response(OK, "Employeedatahistory get by the id", datahistoryResources.transform(employeedatahistory));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


//Create new employeedatahistory by calling the employeedatahistory services and return response
exports.create = async (payload) => {
    try {
        let employeedatahistoryObj = await Employeedatahistory.create(payload);
        employeedatahistoryObj = datahistoryResources.transform(employeedatahistoryObj);
        return response(OK, "New employeedatahistory created", employeedatahistoryObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};

// get the all employeehistory data
exports.list = async (payload) => {
    try {
        let employeedatalist = await Employeedatahistory.findAll(
            {
                include: [
                    'employee',
                    'user'
                ],
                order: [['id', 'DESC']]
            }
        );
        return response(OK, "list of employeedatahistory", datahistoryResources.transformCollection(employeedatalist));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}