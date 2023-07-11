const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeetrainingsessions/index");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
import { response } from '../../helpers';
const {
  getById: getEmployeeTrainingSessionsSchema,
  create: createEmployeeTrainingSessionsSchema,
  update: updateEmployeeTrainingSessionsSchema,
  list: listEmployeeTrainingSessionsSchema,
  remove: deleteEmployeeTrainingSessions,
} = require("../../validations/employeetrainingsessionss");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Employee management"]
moduleCategory.VIEW_TRAINING_SESSIONS = module_helpers["Training sessions management"].VIEW_TRAINING_SESSIONS
let permission, modules;
export default requireAuth(async (req, res) => {
  const {
    query: { id,emp },
    method,
  } = req;

  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_TRAININGS] || req.user.employee.id == req.query.emp) {
        if (id) {
          result = await getById(req.query.id, permission);
        } else {
          result = await list(permission);
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_TRAININGS] || req.user.employee.id == req.body.employee) {
        result = await create(req.body, req.user);
      }
      break;
    case "PUT":
      console.log("ssssss", req.user.employee.id,emp)
      if (permission[moduleCategory.UPDATE_TRAININGS] || req.user.employee.id == req.body.employee) {
        result = await update(req.body, req.query.id, req.user);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_TRAININGS] || req.user.employee.id == emp) {
        result = await remove(req.query.id, req.user);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

export const getById = async (id,perm) => {
  try {
    const { error } = getEmployeeTrainingSessionsSchema.query.validate({ id });

    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getById(id,perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const create = async (payload, usrr) => {
  try {
    // Validate the incoming request
    const { error } =
      createEmployeeTrainingSessionsSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Create new employee by calling the employee services
    return await basic.create(payload, usrr,permission);
    // return response with status code
  } catch (error) {
    // return response with status code
    return response(INTERNAL_SERVER_ERROR, error.message);
  }

};

export const update = async (payload, id, usrr) => {
  try {
    const { error } =
      updateEmployeeTrainingSessionsSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(
      payload,
      id,
      usrr,permission
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const list = async (perm) => {
  try {
    return await basic.list(perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id, usrr) => {
  try {
    const { error } = deleteEmployeeTrainingSessions.query.validate();
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(
      id,
      usrr
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
