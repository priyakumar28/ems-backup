const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR,BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    designation: DESIGNATIONS
} } = require('../../models');
const designationresource = require('../../resources/designation');
const { Op } = require("sequelize");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Designation management"];
moduleCategory.VIEW_DEPARTMENTS = module_helpers["Department management"].VIEW_DEPARTMENTS;



exports.getById = async (id,permission) => {
    let assoc = [];
    if (permission[moduleCategory.VIEW_DEPARTMENTS]) {
        assoc.push("department_department");
    }
    try {
        let designation = await DESIGNATIONS.findOne({
            where: { id: id },
            include: assoc
        });
        if (!designation) {
            return response(NOT_FOUND, "designation detail not found", designation);
        }
        return response(OK, "DesignationDetail", designationresource.transform(designation));
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.create = async (payload) => {
    try {
        let [designationObj, created] = await DESIGNATIONS.findOrCreate({
            where: {
                [Op.or]: [
                    { code: payload.code },
                    { name: payload.name }
                ]
            },
            defaults: payload,
        });
        if (!created) {
            return response(BAD_REQUEST, "Designation with this code or name already exists", designationObj);
        }
        let designation = await this.getById(designationObj.id);
        return response(OK, "New designation created", designation.data);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id) => {
    try {
        let designation = await DESIGNATIONS.findOne(payload, { where: { id } });
        if (!designation) {
            return response(NOT_FOUND, "Designation detail not found", designation);
        }
        let dObj = await DESIGNATIONS.findAll({
            where: {
                [Op.or]: [
                    { code: payload.code },
                    { name: payload.name }
                ],
                id: { [Op.ne]: id }
            },
        });
        if (dObj?.length > 0) {
            return response(BAD_REQUEST, "Designation with this code or name already exists");
        }
        await DESIGNATIONS.update(payload, { where: { id } });

        designation = await this.getById(id);
        return response(OK, "current designation updated", designation.data);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async (permission) => {
    let assoc = [];
    if (permission[moduleCategory.VIEW_DEPARTMENTS]) {
        assoc.push("department_department");
    }
    try {
        let designation = await DESIGNATIONS.findAll({ include: assoc });
        return response(OK, "list of designations", designationresource.transformCollection(designation));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let designation = await DESIGNATIONS.findOne({ where: { id } });
        if (!designation) {
            return response(NOT_FOUND, "designation not found", designation);
        }
        await DESIGNATIONS.destroy({
            where: {
                id: id
            }
        });
        return response(OK, "current designation record deleted");
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}