const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../../config/status_codes");
const { Op } = require("sequelize");
const {
  models: { courses: Courses },
} = require("../../models");
const courseResource = require("../../resources/course");
const { eh } = require("../../config/emphistory");
const { EmpDHC } = require("../../helpers");
const eventEmitter = require("../../events/index");
exports.getById = async (id) => {
  try {
    let coursesObj = await Courses.findOne({
      where: { id: id },
      include: ["coordinator_employee"],
    });
    return response(
      OK,
      "Course retrieved",
      courseResource.transform(coursesObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
exports.create = async (payload,usrr) => {
  try {
    let [coursesObj, created] = await Courses.findOrCreate({
      where: {
        [Op.or]: [
          { code: payload.code },
          {name:payload.name}
        ]
      },
      defaults:payload,
    });
    if (!created) {
      return response(BAD_REQUEST, "course already exists", coursesObj);
    }
    coursesObj = (await this.getById(coursesObj.dataValues.id)).data;
    console.log("keerthana",coursesObj)
        eh("create", usrr, EmpDHC.courses_create, coursesObj);
        // Dispatching the course create event
        //eventEmitter.emit('course_created', coursesObj);
    return response(OK, "New course created", coursesObj);
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.update = async ( payload,id, usrr) => {
  let a, b;
  try {
    let coursesObj  = await Courses.findAll({
      where: {
        [Op.or]: [
          { code: payload.code },
          { name: payload.name }
        ],
        id: {
          [Op.ne]: id
        }
      },
    });
    if (coursesObj?.length > 0) {
      return response(BAD_REQUEST, "course already exists");
    }
    a = await Courses.findOne({
      where: { id },
      include: "coordinator_employee",
    });
    await Courses.update(payload, { where: { id: id }, returning: true });
    b = await Courses.findOne({
      where: { id },
      include: "coordinator_employee",
    });
    eh("update", usrr, EmpDHC.courses_update, a, b);
    coursesObj = (await this.getById(id)).data;
    return response(OK, "Course updated", coursesObj);
  } catch (error) {
    eh("update_failed", usrr, EmpDHC.courses_update, a, b);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
exports.list = async () => {
    try {
        let coursesObj = await Courses.findAll({
            include: [
                "coordinator_employee"
            ],
            order: [['id', 'DESC']]
        });
        return response(OK, "Courses retrieved", courseResource.transformCollection(coursesObj));
    } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.remove = async (id, usrr) => {
  let user;
  try {
    user = await this.getById(id);
    let coursesObj = await Courses.destroy({ where: { id: id } });
    eh("delete", usrr, EmpDHC.courses_delete, user);
    return response(OK, "Course deleted", coursesObj);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.courses_delete, user);
    return response(
      INTERNAL_SERVER_ERROR,
      "Error in deleting the course. Check if any associated training are there."
    );
  }
};
const response = (code, message, data = {}) => {
  return { code, message, data };
};