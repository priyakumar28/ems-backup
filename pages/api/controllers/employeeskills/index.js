import { parseRequestFiles, response } from "../../helpers";

const {
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");

const employeeskill = require("../../services/employees/employeeskills");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const {
  getById: getEmployeeskillSchema,
  create: createEmployeeskillSchema,
  update: updateEmployeeskillSchema,
  remove: deleteEmployeeskillSchema,
} = require("../../validations/employeeskills");

const { module_helpers } = require("../../config/module_helpers");

let moduleCategory = module_helpers["Employee management"];

let permission, modules, parsed_payload;
export const config = {
  api: {
    bodyParser: false,
  },
};

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
      if (permission[moduleCategory.VIEW_SKILLS_CERTIFICATIONS]) {
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
        permission[moduleCategory.CREATE_SKILLS_CERTIFICATIONS] ||
        user.employee.id == parsed_payload.fields.employee
      ) {
        result = await create(parsed_payload, req.user, permission);
      }
      break;
    case "PUT":
      parsed_payload = await parseRequestFiles(req);
    //   console.log("JAMAL JAMA", parsed_payload);
      if (
        permission[moduleCategory.UPDATE_SKILLS_CERTIFICATIONS] ||
        user.employee.id == parsed_payload.fields.employee
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
        permission[moduleCategory.DELETE_SKILLS_CERTIFICATIONS] ||
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
    let usrr = req.user;
    const { error } = getEmployeeskillSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    return await employeeskill.getById(id, usrr, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id, employee_id, perm) => {
  try {
    console.log("JAAAAAAA C", employee_id);
    const { error } = deleteEmployeeskillSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeskill.remove(id, employee_id, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const create = async (payload, usrr, perm) => {
  try {
    const { error } = createEmployeeskillSchema.body.validate(payload.fields);

    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }

    return await employeeskill.create(payload, usrr, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (payload, id, usrr, perm) => {
  try {
    const { error } = updateEmployeeskillSchema.body.validate(payload.fields);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }

    return await employeeskill.update(payload, id, usrr, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const list = async (usrr) => {
  try {
    return await employeeskill.list(usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
