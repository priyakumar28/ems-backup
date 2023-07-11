const { OK, INTERNAL_SERVER_ERROR,BAD_REQUEST } = require("../../config/status_codes");
const {
  models: { projects: Projects, employeeprojects: EmployeeProjects },
} = require("../../models");
const projectsResource = require("../../resources/projects");
const { basic } = require("../../services/employeeprojects");
const { EmpDHC } = require("../../helpers");
const { eh } = require("../../config/emphistory");
const { module_helpers } = require('../../config/module_helpers');

let moduleCategory = {};
moduleCategory.VIEW_CLIENTS = module_helpers["Client management"].VIEW_CLIENTS;
let associations=[]
exports.getById = async (id,permission) => {
  try {
    if(permission[moduleCategory.VIEW_CLIENTS]){
      associations.push('client_client')
    }
    let projectObj = await Projects.findOne({
      where: { id: id },
      include: associations,
    });
    if (!projectObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    return response(
      OK,
      " Got Data for given Id",
      projectsResource.transform(projectObj) 
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.getByPmId = async (pid) => {
  try {
    let empobj = await basic.list();
    const newEmp = [];
    let s = [];
    empobj.data.forEach((val) => {
      let ob = {};
      for (const v in val) {
        if (v === "roles") {
          val[v].forEach((item) => {
            for (const t in item) {
              if (t === "name") {
                s.push(item[t]);
              }
            }
          });
          ob[v] = s;
          s = [];
        } else {
          ob[v] = val[v];
        }
      }
      newEmp.push(ob)
    })
    let em = newEmp.filter((x) => ((x.employee.id === pid) && (x.roles.includes('Project Manager')))).map((x) => x.project.id);
    let projectObj = await Projects.findAll({
      where: { id: em },
      include: "client_client",
    });
    if (!projectObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    return response(
      OK,
      "Got Data for given Id",
      projectsResource.transformCollection(projectObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload, permission,usrr) => {
  try {
    // if(!permission[moduleCategory.CREATE_PROJECTS ] ){
    //   return response(UNAUTHORIZED,"You are not authorized to create project")
    // }
    let projectObj = await Projects.create(payload);

    // projectObj = (await this.getById(projectObj.id,permission)).data;
    let a = await this.getById(projectObj.id,permission);
    try {
      eh("create", usrr, EmpDHC.pro_create, a);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
    //projectObj = Projects.transform(projectObj);
    return response(OK, "New Project Created", projectObj);
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, ussr,permission) => {
  try {
    let b = await Projects.findOne({
      where: { id },
      include:[{
        model: models.users,
        as:"client_client"
      }],
      associations,
    });
    await Projects.update(payload, {
      where: { id: id },
      returning: true,
    });

    let projectObj = (await this.getById(id,permission)).data;
    if (!projectObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    if (projectObj.status == "Dropped") {
      let pobj = await EmployeeProjects.update(
        { status: "Inactive" },
        { where: { project: projectObj.id } }
      );
    }
    let a = await Projects.findOne({ where: { id } });
    eh("update", ussr, EmpDHC.pro_update, b, a);
    return response(OK, "Project Updated", projectObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (whereObj = null) => {
  try {
    if(permission[moduleCategory.VIEW_CLIENTS]){
      associations.push('client_client')
    }
    let options = {      include: associations,
      order: [["id", "DESC"]],
    };
    if (whereObj !== "all") {
      options["where"] = whereObj;
    }
    // let projectObj = await Projects.findAll({
    //   include: "client_client",
    //   order: [["id", "DESC"]],
    // });
    let projectObj = await Projects.findAll(options);
    projectObj = projectsResource.transformCollection(projectObj);
    return response(OK, "All Projects List", projectObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let projectObj = await Projects.destroy({ where: { id: id } });
    if (!projectObj) {
      return response(BAD_REQUEST, "Project not found");
    }
    return response(OK, "project removed", projectObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
