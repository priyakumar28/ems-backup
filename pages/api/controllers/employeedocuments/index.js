import { parseRequestFiles } from "../../helpers";

const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED
} = require("../../config/status_codes");
const {
  getById: getEmployeeDocumentsSchema,
  create: createEmployeeDocumentsSchema,
  update: updateEmployeeDocumentsSchema,
  delete: deleteEmployeeDocumentsSchema,
} = require("../../validations/employeedocuments");
const employeeDocuments = require("../../services/employeedocuments");
const requireAuth = require("../../middlewares/_requireAuth");
import { ac } from "../../middlewares/accesscontrol";
const { response } = require("../../helpers");
const { module_helpers } = require("../../config/module_helpers");
let moduleCategory = module_helpers["Employee management"];

let permission, modules;

export const config = {
  api: {
    bodyParser: false,
  },
};
export default requireAuth(async (req, res) => {
  const {
    query: { id ,emp},
    method,
  } = req;

  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let az = await parseRequestFiles(req);

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_DOCUMENTS]) {
        if (id) {
          result = await getById(req.query.id, req.user);
        } else {
          result = await list();
        }
      }
      break;
    case "POST":
      if ((permission[moduleCategory.CREATE_DOCUMENTS]) || req.user.employee.id === az.fields.employee) {
        result = await create(az, req.user);
      }
      break;
    case "PUT":
      if ((permission[moduleCategory.UPDATE_DOCUMENTS]) || req.user.employee.id === az.fields.employee) {
        result = await update(az, req.query.id, req.user);
      }
      break;
    case "DELETE":
      if ((permission[moduleCategory.DELETE_DOCUMENTS]) || req.user.employee.id === emp) {
        result = await remove(req.query.id);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});
const getById = async (id, usrr) => {
  try {
    const { error } = getEmployeeDocumentsSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeDocuments.getById(id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Create new employee
 * @public
 */
const create = async (payload, usrr) => {

  try {

    payload["createdBy"] = usrr.email;

    const { error } = createEmployeeDocumentsSchema.body.validate(
      payload.fields
    );
    if (error) {

      console.log(error)
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");

      return response(UNPROCESSABLE_ENTITY, message);
    }

    payload["createdAt"] = new Date();
    payload["updatedAt"] = new Date();

    return await employeeDocuments.create(payload, usrr);
  } catch (error) {

    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Update existing employee
 * @public
 */
const update = async (payload, id) => {
  try {

    const { error } = updateEmployeeDocumentsSchema.body.validate(
      payload.fields
    );

    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeDocuments.update(payload, id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Get employee list
 * @public
 */
const list = async () => {
  try {
    return await employeeDocuments.list(usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Delete employee
 * @public
 */
const remove = async (id, usrr) => {
  try {
    const { error } = deleteEmployeeDocumentsSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeDocuments.remove(id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
