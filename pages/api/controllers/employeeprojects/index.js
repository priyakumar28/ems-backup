import { response } from "../../helpers";
const {
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeeprojects");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const {
  getById: getEmployeeProjectSchema,
  create: createEmployeeProjectSchema,
  update: updateEmployeeProjectSchema,
  delete: deleteEmployeeProjectSchema,
  list: listEmployeeProjectSchema,
} = require("../../validations/employeeprojects");
const { module_helpers } = require('../../config/module_helpers');

let moduleCategory = module_helpers["Employee project management"];
moduleCategory.VIEW_EMPLOYEES = module_helpers["Employee management"].VIEW_EMPLOYEES;
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;
let permission, modules;

export default requireAuth(async (req, res) => {
  const {
    query: { id, projectId },
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_EMPLOYEE_PROJECT]) {
        if (id) {
          result = await getById(req.query.id, req.user, permission);
        } else if (projectId) {
          result = await getByProjectId(req.query.projectId);
        } else {
          result = await list();
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.ASSIGN_EMPLOYEES_TO_PROJECT]) {
        result = await create(req.body, req.user);
      }
      break;
    case "PUT":
      if (permission[moduleCategory.UPDATE_EMPLOYEE_PROJECT]) {
        result = await update(req.body, req.query.id, req.user);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.REMOVE_EMPLOYEES_FROM_PROJECT]) {
        result = await remove(req.query.id, req.user);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});
export const getById = async (id, usrr,perm) => {
  try {
    const { error } = getEmployeeProjectSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getById(id, usrr,perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const getByProjectId = async (id) => {
  try {
    return await basic.getByProjectId(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload, usrr) => {
  try {
    const { error } = createEmployeeProjectSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.create(payload, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const update = async (payload, id, usrr) => {
  try {
    const { error } = updateEmployeeProjectSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(payload, id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const list = async (usrr) => {
  try {
    return await basic.list(usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const remove = async (id, usrr) => {
  try {
    const { error } = deleteEmployeeProjectSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};