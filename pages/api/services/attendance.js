const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../config/status_codes');
const { models: {
    attendance: Attendance
} } = require('../models');
const attendanceResource = require('../resources/attendance')
exports.getById = async (id) => {
    try {
        let attendanceObj = await Attendance.findOne({
            where: { id: id },
            include: [
                "employee_employee",
            ]
        });
        return response(OK, "Attendance", attendanceResource.transform(attendanceObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.create = async (payload) => {
    try {
        let attendanceObj = await Attendance.create(payload);
        return response(OK, "New Attendance created", attendanceResource.transform(attendanceObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.update = async (id, payload) => {
    try {
        let attendanceObj = await Attendance.update(payload, { where: { id: id }, returning: true });
        attendanceObj = (await this.getById(id)).data;
        return response(OK, "Attendance updated", attendanceObj);


    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

exports.list = async () => {
    try {
        let attendanceObj = await Attendance.findAll({
            include: [
                "employee_employee",
            ],
            order: [['id', 'DESC']],
        });
        return response(OK, "list of Attendance", attendanceResource.transformCollection(attendanceObj));

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.remove = async (id) => {
    try {
        let attendanceObj = await Attendance.destroy({ where: { id: id } });
        return response(OK, "Attendance deleted", attendanceObj);

    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);

    }
};

const response = (code, message, data = {}) => {
    return { code, message, data };
}


