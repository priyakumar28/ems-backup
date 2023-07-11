const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const basic = require("../../services/emergencycontacts/emergencycontacts");
const requireAuth = require("../../middlewares/_requireAuth");

const {
  getById: getEmergencyContactsSchema,
  create: createEmergencyContactsSchema,
  update: updateEmergencyContactsSchema,
  list: listEmergencyContactsSchema,
  remove: deleteEmergencyContactsSchema,
} = require("../../validations/emergencycontacts");
const { response } = require("../../helpers");
const { ac } = require("../../middlewares/accesscontrol");
const { module_helpers } = require('../../config/module_helpers');
let moduleCategory = module_helpers["Employee management"];
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
let permission, modules;

export default requireAuth(async (req, res) => {
  const {
    query: { id , emp},
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_EMERGENCY_CONTACTS]) {
        if (id) {
          result = await getById(req.query.id, req.user);
        } else {
          result = await list(permission);
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_EMERGENCY_CONTACTS] || req.user.employee.id === req.body.employee) {
        result = await create(req.body, req.user);
      }
      break;
    case "PUT":

      if (permission[moduleCategory.UPDATE_EMERGENCY_CONTACTS] || req.user.employee.id === req.body.employee) {
        result = await update(req.body, req.query.id, req.user, permission);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_EMERGENCY_DOCUMENTS] || req.user.employee.id === emp) {
        result = await remove(req.query.id, req.user);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

export const getById = async (id, usrr,perm) => {
  try {
    const { error } = getEmergencyContactsSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getById(id, usrr,perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const create = async (payload, usrr) => {
  try {
    // payload["createdBy"] = usrr.email;
    const { error } = createEmergencyContactsSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // payload["createdAt"] = new Date();
    // payload["updatedAt"] = new Date();
    return await basic.create(payload, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (payload, id, usrr, perm) => {
  try {
    const { error } = updateEmergencyContactsSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
// <<<<<<< HEAD
    return await basic.update(payload, id, usrr, perm);
// =======
//     return await basic.update(payload, id, usrr,);
// >>>>>>> bbeb539390d0358ea1559fe0a97ef7a46e4703f4
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const list = async (perm) => {
  try {
    return await basic.list(usrr,perm);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id, usrr) => {
  try {
    const { error } = deleteEmergencyContactsSchema.query.validate({id});
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
