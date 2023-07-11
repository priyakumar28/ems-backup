const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/designation");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const { response } = require("../../helpers");
const {
  getById: getDesignationSchema,
  create: createDesignationSchema,
  update: updateDesignationSchema,
  remove: deleteDesignationSchema,
} = require("../../validations/designation");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Designation management"];
moduleCategory.VIEW_DEPARTMENTS = module_helpers["Department management"].VIEW_DEPARTMENTS;
let permission, modules;
export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_DESIGNATIONS]) {
        if (id) {
          result = await getById(req.query.id, req.user);
        } else {
          result = await list();
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_DESIGNATIONS]) {
        result = await create(req.body, req.user);
      }
      break;
    case "PUT":
      if (permission[moduleCategory.UPDATE_DESIGNATIONS]) {
        result = await update(req.body, req.query.id, req.user);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_DESIGNATIONS]) {
        result = await remove(req.query.id, req.user);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

const cant = (err) => {
  const { details } = err;
  const message = details.map((i) => i.message.replace(/\"/g, "")).join(",");
  return response(UNPROCESSABLE_ENTITY, message);
};
export const getById = async (id,permission) => {
  try {
    const { error } = getDesignationSchema.query.validate();
    if (error) {
      return cant(error);
    }
    return await basic.getById(id, permission);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload, usrr) => {
  try {
    const { error } = createDesignationSchema.body.validate(payload);
    if (error) {
      return cant(error);
    }
    return await basic.create(payload, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const update = async (payload, id, usrr) => {
  try {
    const { error } = updateDesignationSchema.body.validate(payload);
    if (error) {
      return cant(error);
    }
    return await basic.update(payload, id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const list = async () => {
  try {
    return await basic.list(permission);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message, []);
  }
};
export const remove = async (id) => {
  try {
    const { error } = deleteDesignationSchema.query.validate({ id });
    if (error) {
      return cant(error);
    }
    return await basic.remove(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
