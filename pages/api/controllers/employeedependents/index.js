const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const { basic } = require('../../services/employeedependents');
const requireAuth = require('../../middlewares/_requireAuth');


const {
    getById: getEmployeeDependentSchema,
    create: createEmployeeDependentSchema,
    update: updateEmployeeDependentSchema,
    delete: deleteEmployeeDependentSchema,
    list: listEmployeeDependentSchema
} = require('../../validations/employeedependents');
const { response } = require("../../helpers");
export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (id) {
        result = await getById(req.query.id);
      } else {
        result = await list();
      }
      break;
    case "POST":
      result = await create(req.body);
      break;
    case "PUT":
      result = await update(req.body, req.query.id);
      break;
    case "DELETE":
      result = await remove(req.query.id);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});


/**
 * Get all employeedependents and send as response.
 * @public
 */
const getById = async (id) => {
  try {
    const { error } = getEmployeeDependentSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getById(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const remove = async (id) => {
  try {
    // let id = req.query.id;
    const { error } = deleteEmployeeDependentSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(id);
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload) => {
  try {
    // let payload = req.body;
    const { error } = createEmployeeDependentSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.create(payload);
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const update = async (payload, id) => {
  try {
    const { error } = updateEmployeeDependentSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(payload, id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const list = async () => {
  try {
    return await basic.list();
    //return res.status(code).send(dataimportObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
