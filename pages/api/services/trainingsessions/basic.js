const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../config/status_codes');
const { models: {
    trainingsessions: Trainingsessions
} } = require('../../models');
const trainingsessionsResource = require('../../resources/trainingsessions')
const { module_helpers } = require('../../config/module_helpers');

let moduleCategory = {};
moduleCategory.VIEW_COURSES = module_helpers["Course management"].VIEW_COURSES;
let associations = []

exports.getById = async (id, permission) => {
    try {
        if (permission[moduleCategory.VIEW_COURSES]) {
            associations.push('course_course')
        }
        let trainingsessionObj = await Trainingsessions.findOne({
            where: { id: id },
            include: associations
        });
        if (!trainingsessionObj) {
            return response(BAD_REQUEST, "data with given id not found");
        }
        return response(OK, "Training session found", trainingsessionsResource.transform(trainingsessionObj));
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }


};

exports.create = async (payload,permission) => {
    try {
        let trainingsessionObj = await Trainingsessions.create(payload);
        // Create new training sessions by calling the training  services and return response
        trainingsessionObj = await this.getById(trainingsessionObj.id, permission);
        // console.log("after",trainingsessionObj);
        return response(OK, "New training session created", trainingsessionObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.update = async (payload, id,permission) => {
    try {
        // Update an training session by calling the training session services and return response
        let trainingsessionObj = await Trainingsessions.findOne({ where: { id }, include: "course_course" })
        await Trainingsessions.update(payload, { where: { id: id } });
        if (!trainingsessionObj) {
            return response(BAD_REQUEST, "Training session not found");
        }
        trainingsessionObj = (await this.getById(id,permission));
        return response(OK, "Training session updated", trainingsessionObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.list = async (permission) => {
    try {
        // TrainingSessions.list
        // Return trainingsession list by calling the trainingsession services
        if (permission[moduleCategory.VIEW_COURSES]) {
            associations.push('course_course')
        }
        let trainingsessionObj = await Trainingsessions.findAll({
            include: associations,
            order: [['id', 'DESC']]
        });
        return response(OK, "Training sessions retrived", trainingsessionsResource.transformCollection(trainingsessionObj));
    } catch (error) {
        console.log(error);
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message)
    }
};

exports.remove = async (id) => {
    try {
        // Remove the training session by id by calling the trainingsession services
        let trainingsessionObj = await Trainingsessions.destroy({ where: { id: id } });
        if (!trainingsessionObj) {
            return response(BAD_REQUEST, "Training session not found");
        }
        return response(OK, "Trainining Session Removed", trainingsessionObj);
    } catch (error) {
        // Return exception
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}