const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeeovertime");
const requireAuth = require("../../middlewares/_requireAuth");
const {
  getById: getEmployeeSchema,
  create: createEmployeeovertimeSchema,
  update: updateEmployeeSchema,
  list: listEmployeeovertimeSchema,
  remove: deleteEmployee,
} = require("../../validations/employeeovertime");
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
 * Get all employeeovertime and send as response.
 * @public
 */
export const getById = async (id) => {
  try {
    // Validate the incoming request
    const { error } = getEmployeeSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Return employeeovertime by his/her id by calling the employeeovertime services
    return await basic.getById(id);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Create new employeeovertime
 * @public
 */
export const create = async (payload) => {
  try {
    // Validate the incoming request
    const { error } = createEmployeeovertimeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Create new employeeovertime by calling the employeeovertime services
    return await basic.create(payload);
  } catch (error) {
    // return response with status code
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Update existing employee
 * @public
 */
export const update = async (payload, id) => {
  try {
    // Validate the incoming request
    const { error } = updateEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Update an employeeovertime by calling the employeeovertime services and return response
    return await basic.update(payload, id);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Get employee list
 * @public
 */
export const list = async () => {
  try {
    // Return employeeovertime list by calling the employeeovertime services
    return await basic.list();
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Delete employee
 * @public
 */
export const remove = async (id) => {
  try {
    // Validate the incoming request
    const { error } = deleteEmployee.body.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Remove the employeeovertime by his/her id by calling the employeeovertime services
    return await basic.remove(id);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
