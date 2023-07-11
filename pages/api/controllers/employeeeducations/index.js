import { parseRequestFiles } from "../../helpers";
const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeeeducations");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const {
  getById: getEmployeeeducationsSchema,
  create: createEmployeeEducationSchema,
  update: employeeEducationsUpdateSchema,
  list: employeeEducationsListSchema,
  remove: deleteEmployeeEducationsSchema,
} = require("../../validations/employeeeducations");
const { response } = require("../../helpers");
const { module_helpers } = require("../../config/module_helpers");
let moduleCategory = module_helpers["Employee management"]
let permission, modules;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default requireAuth(async (req, res) => {
  const {
    query: { id, emp },
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  // console.log("sssssssssss", permission);
  let az = await parseRequestFiles(req);

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_EDUCATIONS]) {
        if (id) {
          result = await getById(req.query.id,permission);
        } else {
          result = await list();
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_EDUCATIONS] || req.user.employee.id === az.fields.employee) {
        let payload = az;
        result = await create(payload);
      }
      break;
    case "PUT":
      console.log("sssss",az)
      if (permission[moduleCategory.UPDATE_EDUCATIONS] || req.user.employee.id === az.fields.employee) {
        let payload = az;
        result = await update(payload, req.query.id, permission, req.user);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_EDUCATIONS] || req.user.employee.id === emp) {
        result = await remove(req.query.id);
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
    const { error } = getEmployeeeducationsSchema.query.validate({ id });
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
export const remove = async (id, perm) => {
  try {
    const { error } = deleteEmployeeEducationsSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(id, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload, perm) => {
  
  try {

    const { error } = createEmployeeEducationSchema.body.validate(payload.fields);

    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
        
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.create(payload, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const update = async (payload, id, perm, ussr) => {
  try {
    let rfile;
    if (payload.fields.hasOwnProperty("removeFile")) {
      rfile = payload.fields.removeFile;
      delete payload.fields.removeFile;
    }
    const { error } = employeeEducationsUpdateSchema.body.validate(payload.fields);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    if (rfile) {
      payload.fields.removeFile = rfile;
    }
    return await basic.update(payload, id, perm, ussr);
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
