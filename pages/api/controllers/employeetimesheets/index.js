const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeetimesheets");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const {
  getById: getEmployeeSchema,
  create: createEmployeetimesheetsSchema,
  update: updateEmployeeSchema,
  list: listEmployeetimesheetsSchema,
  remove: deleteEmployee,
} = require("../../validations/employeetimesheets");
const { response } = require("../../helpers");

export default requireAuth(async (req, res) => {
  const {
    query: { id, empId },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (await ac(req.user.roles, ["View timesheets"], req.user.email)) {
        if (id) {
          result = await getById(req.query.id, req.user);
        } else if (empId) {
          result = await getByEmployeeId(req.query.empId);
        } else {
          result = await list();
        }
      }
      break;
    case "POST":
      if (await ac(req.user.roles, ["Create timesheets"], req.user.email)) {
        result = await create(req.body, req.user);
      }
      break;
    case "PUT":
      if (await ac(req.user.roles, ["Update timesheets"], req.user.email)) {
        result = await update(req.body, req.query.id);
      }
      break;
    case "DELETE":
      if (await ac(req.user.roles, ["Delete timesheets"], req.user.email)) {
        result = await remove(req.query.id, req.user);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

/**
 * Get all employeetimesheets and send as response.
 * @public
 */
export const getById = async (id, usrr) => {
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
    // Return employeetimesheets by his/her id by calling the employeetimesheets services
    return await basic.getById(id, usrr);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getByEmployeeId = async (id) => {
  try {
    if (req.query.empId === "null") {
      id = req.user.employee.id;
    } else {
      id = req.query.empId;
    }
    return await basic.getByEmployeeId(id);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Create new employeetimesheets
 * @public
 */
export const create = async (payload, usrr) => {
  try {
    // Validate the incoming request
    const { error } = createEmployeetimesheetsSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Create new employeetimesheets by calling the employeetimesheets services
    return await basic.create(payload, usrr);
  } catch (error) {
    // return response with status code
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Update existing employee
 * @public
 */
export const update = async (payload, id, usrr) => {
  try {
    // Validate the incoming request
    payload.comments = payload.comments ? payload.comments : " ";
    const { error } = updateEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Update an employeetimesheets by calling the employeetimesheets services and return response

    return await basic.update(payload, id, usrr);
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
    // Return employeetimesheets list by calling the employeetimesheets services
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
export const remove = async (id, usrr) => {
  try {
    // Validate the incoming request
    const { error } = deleteEmployee.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Remove the employeetimesheets by his/her id by calling the employeetimesheets services
    return await basic.remove(id, usrr);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
