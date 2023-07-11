const {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST
} = require("../../config/status_codes");
const {
  models: {
    employeeprojects: EmployeeProjects,
    projects: projects,
    clients: clients,
    employees: Employees,
  },
} = require("../../models");
const employeeprojectsResource = require("../../resources/employeeprojects");
const employees = require("../../resources/employees");
const { EmpDHC, response } = require("../../helpers");
const { eh } = require("../../config/emphistory");
const { module_helpers } = require('../../config/module_helpers');

let moduleCategory = ["View employees", "View roles"]
let assoc = ["employee_employee",
  "employeeprojects_userroles",]
let newAssoc = [{
  model: projects,
  as: "project_project",
  // include: [
  //   {
  //     model: clients,
  //     as: "client_client",
  //   },
  // ],
}];

exports.getById = async (id, permission) => {
  try {
    for (const i of moduleCategory) {
      if (permission[moduleCategory[i]]) {
        newAssoc.push(assoc[i])
      }
    }
    let employeeprojectObj = await EmployeeProjects.findOne({
      where: { id: id },
      include: newAssoc
    });
    if (!employeeprojectObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    return response(
      OK,
      " Got Data for given Id",
      employeeprojectsResource.transform(employeeprojectObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
exports.getByProjectId = async (id) => {
  try {
    let employeeprojectObj = await EmployeeProjects.findAll({
      where: { project: id },
      include: [
        {
          model: projects,
          as: "project_project",
          include: [
            {
              model: clients,
              as: "client_client",
            },
          ],
        },
        "employee_employee",
        "employeeprojects_userroles",
      ],
    });
    if (!employeeprojectObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    return response(
      OK,
      " Got Data for given Id",
      employeeprojectsResource.transformCollection(employeeprojectObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
exports.create = async (payload, usrr) => {
  try {
    let employeeprojectObj;
    if (payload.roles) {
      let roler = payload.roles.map((x) => x.value);
      delete payload.roles;
      employeeprojectObj = await EmployeeProjects.create(payload);
      if (roler && typeof roler === "object" && roler.length > 0) {
        await employeeprojectObj.setEmployeeprojects_userroles(roler);
      }
      employeeprojectObj = await this.getById(employeeprojectObj.id);
      eh("create", usrr, EmpDHC.emppro_create, employeeprojectObj);
      return response(OK, "New Employee Project Created", employeeprojectObj);
    } else {
      employeeprojectObj = await EmployeeProjects.create(payload);
      employeeprojectObj = await this.getById(employeeprojectObj.id);
      try {
        eh("create", usrr, EmpDHC.emppro_create, employeeprojectObj);
      } catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
      }
      return response(OK, "New Employee Project Created", employeeprojectObj);
    }
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, ussr) => {
  let b, a
  try {
    b = await EmployeeProjects.findOne({
      where: { id },
      include: "employee_employee",
    });
    let employeeprojectObj;
    if (payload.roles && payload.roles.length > 0) {
      let roler = payload.roles.map((x) => x.value);
      delete payload.roles;
      await EmployeeProjects.update(payload, {
        where: { id: id },
        returning: true,
      });
      employeeprojectObj = await EmployeeProjects.findOne({ where: { id } });
      if (roler && typeof roler === "object" && roler.length > 0) {
        await employeeprojectObj.setEmployeeprojects_userroles(roler);
      }
      let employeeprojectObj1 = await this.getById(id);
      a = await EmployeeProjects.findOne({ where: { id } });
      eh("update", ussr, EmpDHC.emppro_update, b, a);

      return response(OK, "Employee Project updated", employeeprojectObj1);
    } else {
      employeeprojectObj = await this.getById(id);
      let empro = await EmployeeProjects.findOne({ where: { id } });
      let roler = employeeprojectObj.data.roles.map((x) => x.id);
      await empro.removeEmployeeprojects_userroles(roler);
      employeeprojectObj = await EmployeeProjects.update(payload, {
        where: { id: id },
        returning: true,
      });
      a = await EmployeeProjects.findOne({ where: { id } });
      eh("update", ussr, EmpDHC.emppro_update, b, a);
    }
    employeeprojectObj = await this.getById(id);
    return response(
      OK,
      "Assigned Employee Project Details Updated",
      employeeprojectObj
    );
  } catch (error) {

    eh("update_failed", ussr, EmpDHC.emppro_update_failed, b, a);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
exports.list = async (projectId, whereObj = null) => {
  try {
    for (const i of moduleCategory) {
      if (permission[moduleCategory[i]]) {
        newAssoc.push(assoc[i])
      }
    }
    if (whereObj !== null) {
      if (typeof projectId != "number" || isNaN(projectId)) {
        delete whereObj.project;
      }
    }
    let options = {
      include: newAssoc,
      order: [["id", "DESC"]],
    };
    if (whereObj !== "all" && whereObj !== null && !isNaN(whereObj)) {
      options["where"] = whereObj;
    }
    let employeeprojectObj = await EmployeeProjects.findAll(options);
    employeeprojectObj =
      employeeprojectsResource.transformCollection(employeeprojectObj);
    return response(OK, "All Employee Projects List", employeeprojectObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
exports.remove = async (id, usrr) => {
  let b;
  try {
    b = await EmployeeProjects.findOne({ where: { id } });
    if (!b) {
      return response(BAD_REQUEST, "Employee Project not found");
    }
    await EmployeeProjects.destroy({ where: { id: id } });
    eh("delete", usrr, EmpDHC.emppro_delete, b);
    return response(OK, "Employee project removed", b);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.emppro_delete, b);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
