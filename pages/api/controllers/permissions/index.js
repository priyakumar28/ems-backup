const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/permissions");
const requireAuth = require("../../middlewares/_requireAuth");
import { response } from "../../helpers";

const {
  //getById : getPermissionsSchema,
  create: createPermissionsSchema,
  update: updatePermissionsSchema,
  list: listPermissionsSchema,
  remove: deletePermissionsSchema,
} = require("../../validations/permissions");

export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (id) {
        result = await getById(req, res);
      } else {
        result = await list();
      }
      break;
    case "POST":
      result = await create(req.body);
      break;
    case "PUT":
      result = await update(req, res);
      break;
    case "DELETE":
      result = await remove(req.query.modid, req.query.roleid);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

const cant = (err, res) => {
  const { details } = err;
  const message = details.map((i) => i.message.replace(/\"/g, "")).join(",");
  return res.status(UNPROCESSABLE_ENTITY).json({ message });
};

export const create = async (payload) => {
  try {
    const { error } = createPermissionsSchema.body.validate(payload);

    if (error) {
      return cant(error, res);
    }
    return await basic.create(payload);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (req, res) => {
  try {
    const { error } = updatePermissionsSchema.body.validate(req.body);
    if (error) {
      return cant(error, res);
    }
    let { module_id, user_role, permissions } = req.body;
    let { code, ...permissionsObj } = await basic.update(
      module_id,
      user_role,
      permissions
    );
    return res.status(code).send(permissionsObj);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const list = async () => {
  try {
    return await basic.list();
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (moduleid, leid) => {
  try {
    const { error } = deletePermissionsSchema.query.validate({
      moduleid: req.query.modid,
      roleid: req.query.roleid,
    });
    if (error) {
      return cant(error, response);
    }
    return await basic.remove(moduleid, roleid);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

///////////////////////////////////////////////////////////

// const getById = async (req,res) => {
//     try {
//         let id = req.query.id;
//         let moduleid = req.query.modid;
//         let roleid = req.query.rid;
//         const { error } = getPermissionsSchema.query.validate();

//         if(error) {
//             const { details } = errror;
//             const message = details.map(i => i.message.replace(/\"/g,'')).join(',');
//             return res.status(UNPROCESSABLE_ENTITY).json({message});
//         }
//         let { code, ...permissionsObj } = await basic.getById(id,moduleid,roleid);
//         return res.status(code).send(permissionsObj);
//     }catch (error) {
//         return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
//     }
// };
