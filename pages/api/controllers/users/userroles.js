const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const basic  = require("../../services/user/userroles");
const {
    getById: getUserroleSchema,
    list: getAllUserroleSchema,
    createOrUpdate: createorUpdateUserroleSchema,
    remove: removeUserroleSchema
} = require('../../validations/userroles');
const { ac } = require('../../middlewares/accesscontrol');
const requireAuth = require("../../middlewares/_requireAuth");
import { response } from "../../helpers";
const { module_helpers } = require('../../config/module_helpers');


let moduleCategory = module_helpers["Roles management"];
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
            if (permission[moduleCategory.VIEW_ROLES]) {
                if (id) {
                    result = await getById(req.query.id);
                } else {
                    result = await list();
                }
            }
            break;
        case "POST":
        case "PUT":
            if (permission[moduleCategory.CREATE_ROLES]) {
                result = await createOrUpdate(req.body,permission);
            }
            break;
        case "DELETE":
            if (permission[moduleCategory.DELETE_ROLES]) {
                result = await remove(req.query.id);
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
            result = response(false, `Method ${method} Not Allowed`);
    }
    return res.json(result);
});

export const cant = (err, res) => {
    const { details } = err;
    const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
    return response(UNPROCESSABLE_ENTITY, message);
}

export const getById = async (id) => {
  try {
    const { error } = getUserroleSchema.query.validate({ id });
    if (error) {
      return cant(error, res);
    }
    return await basic.getById(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};


export const createOrUpdate = async (payload, perm) => {
    try {
        let mod_arr;
        if (payload.mod_arr) {
             mod_arr = payload.mod_arr 
            delete payload.mod_arr;
        }
        const { error } = createorUpdateUserroleSchema.body.validate(payload);
        if (error) {
            return cant(error, res);
        }
        payload["mod_arr"] = mod_arr;
        return await basic.createOrUpdate(payload,perm);
    }
    catch (error) {
        return response(INTERNAL_SERVER_ERROR, error.message);
    }
};

export const list = async () => {
  try {
    return await basic.list();
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id) => {
  try {
    const { error } = removeUserroleSchema.query.validate({ id });
    if (error) {
      return cant(error, res);
    }
    return await basic.remove(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
