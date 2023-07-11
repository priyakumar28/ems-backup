const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    employeeapprovals: Employeeapprovals
} } = require('../../models');
const employeeapprovalResources = require('../../resources/employeeapprovals');



//Return employeeapprovals by their id by calling the employeeapprovals services
exports.getById = async (id) => {
    try {
        let employeeapproval = await Employeeapprovals.findOne({ where: { id: id } });
        if (!employeeapproval) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }

        return response(OK, "Employeeapprovals get by the id", employeeapprovalResources.transform(employeeapproval));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};


//Create new employeeapprovals by calling the employeeapprovals services and return response
exports.create = async (payload) => {
    try {
        let employeeapprovalObj = await Employeeapprovals.create(payload);
        employeeapprovalObj = employeeapprovalResources.transform(employeeapprovalObj);
        return response(OK, "New employeeapprovals created", employeeapprovalObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }

};


// Update employeeapprovals by their id by calling the employeeapprovals services
exports.update = async (payload, id) => {
    try {
        let employeeapprovalsupdate = await Employeeapprovals.findOne({ where: { id: id } });

        if (!employeeapprovalsupdate) {
            return response(BAD_REQUEST, "data with given id " + id + " is not found");
        }
        await Employeeapprovals.update(payload, { where: { id: id }, returning: true });
        employeeapprovalsupdate = (await this.getById(id)).data;

        return response(OK, "Employeeapprovals Successfully Updated", employeeapprovalsupdate);

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};


// get the all employeeapprovals 
exports.list = async (payload) => {
    try {
        let employeeapprovalslist = await Employeeapprovals.findAll(payload);

        return response(OK, "list of employeeapprovals", employeeapprovalResources.transformCollection(employeeapprovalslist));

    } catch (error) {

        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};


// Delete the employeeapprovals by their specific id's
exports.remove = async (id) => {
    try {
        let employeeapprovalsremove = await Employeeapprovals.destroy({ where: { id: id } });
        if (!employeeapprovalsremove) {
            return response(BAD_REQUEST, "data with given id is not found");
        }
        return response(OK, "employeeapprovals successfully " + id + " deleted", employeeapprovalsremove);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}