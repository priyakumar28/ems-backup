const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED
} = require("../../config/status_codes");
const { basic } = require("../../services/clients");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
import { parseRequestFiles } from "../../helpers";

const {
  getById: getClientSchema,
  create: createCientSchema,
  update: updateClientSchema,
  delete: deleteClientSchema,
  list: listClientSchema,
} = require("../../validations/clients");

const { response } = require("../../helpers");
import { module_helpers } from '../../config/module_helpers';

let moduleCategory = module_helpers["Client management"]
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
      if (permission[moduleCategory.VIEW_CLIENTS]) {
        if (id) {
          result = await getById(req.query.id, permission);
        } else {
          result = await list();
        }
      }
      break; 
    case "POST":
      if (permission[moduleCategory.CREATE_CLIENTS]) {
        result = await create(req.body, permission,req.user);
      }
      break;
    case "PUT":
      if (permission[moduleCategory.UPDATE_CLIENTS]) {
        result = await update(req.body, req.query.id, req.user,permission);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_CLIENTS]) {
        result = await remove(req.query.id, req.user,permission);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

/**
 * Get all clients and send as response.
 * @public
 */
const getById = async (id,perm) => {
    
        try {
            // Return client by his/her id by calling the client services

    const { error } = getClientSchema.query.validate();
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }

    return await basic.getById(id,perm);
    //return response(code).send({ clientObj });
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Create new client
 * @public
 */
export const create = async (payload,perm) => {
    
        try {
      
            const { error } = createCientSchema.body.validate(payload);
            if (error) {
                const { details } = error;
                const message = details
                    .map((i) => i.message.replace(/\"/g, ""))
                    .join(",");
                return response(UNPROCESSABLE_ENTITY,message);
            }
            
           return await basic.create(payload,perm);
            
        } catch (error) {
          
            return response(INTERNAL_SERVER_ERROR,error.message);
        }
   
};

/**
 * Update existing client
 * @public
 */
export const update = async (payload, id,perm) => {
  try {
    const { error } = updateClientSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(payload, id,perm);
    //return response(code).send(clientObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Get client list
 * @public
 */
export const list = async () => {
  try {
    return await basic.list();
    //return response(code).send(clientObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Delete client
 * @public
 */
export const remove = async (id) => {
  try {
    const { error } = deleteClientSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(id);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
