const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const basic = require("../../services/user/users");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const { response } = require("../../helpers");
const {
    getById: getUserSchema,
    list: getAllUserSchema,
    create: createUserSchema,
    update: updateUserSchema,
    remove: removeUserSchema
} = require('../../validations/users');
const getRawBody = require('raw-body');
const { module_helpers } = require('../../config/module_helpers');

export const config = {
  api: {
    bodyParser: false,
  },
};
let moduleCategory = module_helpers["User management"];
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;
moduleCategory.VIEW_EMPLOYEES =
  module_helpers["Employee management"].VIEW_EMPLOYEES;
let permission, modules;
export default requireAuth(async (req, res) => {
  const {
    query: { id, email },
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_USERS]) {
        if (id || email) {
          result = await getByIdOrEmail(req.query, permission);
        } else {
          result = await list(permission);
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_USERS]) {
        let payload = await getRawBody(req);
        payload = JSON.parse(payload);
        result = await create(payload);
      }
      break;
    case "PUT":
      if (permission[moduleCategory.UPDATE_USERS]) {
        let payload = await getRawBody(req);
        payload = JSON.parse(payload);
        result = await update(payload, req.query.id, req.query?.update_type,permission);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_USERS]) {
        result = await remove(req.query.id);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

export const cant = (err) => {
  const { details } = err;
  const message = details.map((i) => i.message.replace(/\"/g, "")).join(",");
  return response(UNPROCESSABLE_ENTITY, message);
};

export const getByIdOrEmail = async (query, perm) => {
  try {
    const { id, email } = query;
    let data = id ? { id } : { email };
    const { error } = getUserSchema.query.validate(data);
    if (error) {
      return cant(error);
    }
    return await basic.getByIdOrEmail(data, perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const create = async (payload) => {
  try {
    const { error } = createUserSchema.body.validate(payload);
    if (error) {
      return cant(error);
    }
    if (payload.user_roles) {
      if (!permission[moduleCategory.ASSIGN_USER_ROLES]) {
        return response(UNAUTHORIZED, "you are not authorized to assign roles");
      }
    }
    return await basic.create(payload, permission);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (payload, id, update_type,perm) => {
  try {
    if (update_type === "profile_pic") {
      return await basic.update(payload, id, update_type);
    }

    const { error } = updateUserSchema.query.validate({ id: id });
    if (error) {
      return cant(error);
    }

    const { error2 } = updateUserSchema.body.validate(payload);
    if (error2) {
      return cant(error2);
    }

    delete payload.email;
    if (payload.user_roles) {
      if (permission[moduleCategory.ASSIGN_USER_ROLES]) {
        if (typeof payload.user_roles == "object") {
          update_type = "role_update";
          payload["role_update"] = payload.user_roles;
          delete payload.user_roles;
        }
      } else {
        return response(UNAUTHORIZED, "you are not authorized");
      }
    }
    return await basic.update(payload, id, update_type,perm);
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

export const remove = async (id) => {
  try {
    const { error } = removeUserSchema.query.validate({ id: id });
    if (error) {
      return cant(error);
    }
    return await basic.remove(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
