const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { employee_leave_days_service } = require("../../services/leave");

const {
  create: createEmployeeLeavedaysSchema,
  update: updateEmployeeLeavedaysSchema,
  getById: getByIdEmployeeLeavedaysSchema,
  delete: deleteEmployeeLeavedaysSchema,
} = require("../../validations/employeeleavedays");

const { response } = require("../../helpers");

const requireAuth = require("../../middlewares/_requireAuth");

export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (id) {
        result = await getById(req.query.id, req.user);
      } else {
        result = await list();
      }
      break;
    case "POST":
      result = await create(req.body, req.user);
      break;
    case "PUT":
      result = await update(payload, req.query.id, req.user);
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

export const create = async (payload, usrr) => {
  try {
    //To validate request coming from payload
    const { error } = createEmployeeLeavedaysSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    //Create new leave type by calling the leave_type_ service
    return await employee_leave_days_service.create(payload, usrr);
  } catch (error) {
    //return response with a status code as defined in ../../config/status_code.js
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (payload, id, usrr) => {
  try {
    //Validate request coming from update payload
    const { error } = updateEmployeeLeavedaysSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employee_leave_days_service.update(payload, id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getById = async (id, usrr) => {
  try {
    const { error } = getByIdEmployeeLeavedaysSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }

    return await employee_leave_days_service.getById(id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const list = async () => {
  try {
    return await employee_leave_days_service.list();
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id) => {
  try {
    const { error } = deleteEmployeeLeavedaysSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employee_leave_days_service.remove(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
