const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeeemploymenthistory");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const { parseRequestFiles, response } = require("../../helpers");
const {
  getById: getEmployeeSchema,
  create: createEmployeeemploymenthistorySchema,
  update: updateEmployeeSchema,
  list: listEmployeeemployeementhistorySchema,
  remove: deleteEmployee,
} = require("../../validations/employeeemploymenthistory");
const { module_helpers } = require("../../config/module_helpers");
let moduleCategory = module_helpers["Employee management"];
let permission, modules, parsed_payload;
export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
    user,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_EMPLOYEMENT_HISTORY]) {
        if (id) {
          result = await getById(req.query.id, permission);
        } else {
          result = await list(permission);
        }
      }
      break;
    case "POST":
      parsed_payload = await parseRequestFiles(req);
      if (
        permission[moduleCategory.CREATE_EMPLOYEMENT_HISTORY] ||
        user.employee.id == parsed_payload.fields.employee
      ) {
        result = await create(parsed_payload, req.user, permission);
      }
      break;
    case "PUT":
      parsed_payload = parseRequestFiles(req);
      if (
        permission[moduleCategory.UPDATE_EMPLOYEMENT_HISTORY] ||
        user.employee.id == req.body.employee
      ) {
        result = await update(
          parsed_payload,
          req.query.id,
          req.user,
          permission
        );
      }
      break;
    case "DELETE":
      if (
        permission[moduleCategory.DELETE_EMPLOYEMENT_HISTORY] ||
        user.employee.id == req.query.employee
      ) {
        result = await remove(req.query.id, req.query.employee, permission);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});
export const getById = async (id, perm) => {
  try {
    const { error } = getEmployeeSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getById(id, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const remove = async (id, employee_id, perm) => {
  try {
    const { error } = deleteEmployee.query.validate({
      id,
      employee: employee_id,
    });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(id, employee_id, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload, usrr, perm) => {
  try {
    console.log("INSIDE CONTROLLER (HISTORY)", payload);
    const { error } = createEmployeeemploymenthistorySchema.body.validate(
      payload.fields
    );
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.create(payload, usrr, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const update = async (payload, id, usrr, perm) => {
  try {
    if (payload.payroll_amount?.includes("*")) {
      delete payload.payroll_amount;
    }
    const { error } = updateEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(payload, id, usrr, perm);
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
