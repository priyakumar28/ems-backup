const {
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/projects");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
import { response } from "../../helpers";
const { module_helpers } = require('../../config/module_helpers');
const {
  getById: getProjectSchema,
  create: createProjectSchema,
  update: updateProjectSchema,
  delete: deleteProjectSchema,
  list: listProjectSchema,
} = require("../../validations/projects");
export const config = {
  api: {
      bodyParser: false
  }
}
let moduleCategory = module_helpers["Project management"]
moduleCategory.VIEW_CLIENTS = module_helpers["Client management"].VIEW_CLIENTS
let permission, modules;
export default requireAuth(async (req, res) => {
  const {
    query: { id, pmid },
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_PROJECTS]){
        if (id) {
          result = await getById(req.query.id, permission  );
        } else if (pmid) {
          result = await getByPmId(req.query.id);
        } else {
          result = await list(permission);
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_PROJECTS]) {
        result = await create(req.body,permission, req.user);
      }
      break;
    case "PUT":
      if (permission[moduleCategory.UPDATE_PROJECTS]) {
        let payload = {
          name: req.body.name,
          client: req.body.client,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          status: req.body.status,
          details: req.body.details,
          created: req.body.created,
        };
        result = await update(payload, req.query.id, req.user,permission);
      } 
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_PROJECTS]) {
        result = await remove(req.query.id,permission, req.user);
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
    const { error } = getProjectSchema.query.validate();
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

 export const getByPmId = async (id) => {
  try {
    const { error } = getProjectSchema.query.validate();
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getByPmId(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload,permission, usrr) => {
  try {
    
    // {
    //   name: req.body.name,
    //   client: req.body.client,
    //   start_date: req.body.start_date,
    //   end_date: req.body.end_date,
    //   status: req.body.status,
    //   details: req.body.details,
    //   created: req.body.created,
    // };
    const { error } = createProjectSchema.body.validate(payload);
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

export const update = async (payload, id, usrr,perm) => {
  try {
    const { error } = updateProjectSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(payload, id, usrr,perm);
  } catch (error) {
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

 export const remove = async (id, usrr) => {
  try {
    const { error } = deleteProjectSchema.query.validate({id});
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
