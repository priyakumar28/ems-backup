import { response } from "../../helpers";

const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employeetimeentry");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const {
  getById: getEmployeeTimeEntrySchema,
  create: createEmployeetimeentrySchema,
  update: updateEmployeetimeentrySchema,
  remove: deleteEmployee,
} = require("../../validations/employeetimeentry");

/**Edited by: Sanjeev Gunasekaran 200089 @public*/
export default requireAuth(async (req, res) => {
  const {
    query: { id, projectId, employeeId },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (await ac(req.user.roles, ["View timesheets"], req.user.email)) {
        if (id) {
          result = await getById(req.query.id);
        } else if (projectId, employeeId) {
          result = await getByProjectIdAndEmployeeId(
            req.query.projectId,
            req.query.employeeId
          );
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
        result = await update(req.body, req.query.id, req.user);
      }
      break;
    case "DELETE":
      if (await ac(req.user.roles, ["Delete timesheets"], req.user.email)) {
        result = await remove(req, res);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`)
  }
  return res.json(result);
});

/**
 * Get all employeetimeentry and send as response.
 * Sanjeev Gunasekaran 200089
 * @public
 */
export const getById = async (id) => {
  try {
    // Validate the incoming request
    const { error } = getEmployeeTimeEntrySchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Return employeetimeentry by his/her id by calling the employeetimeentry services
    return await basic.getById(id);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getByProjectIdAndEmployeeId = async (projectId, employeeId) => {
  try {
    return await basic.getByProjectIdAndEmployeeId(projectId, employeeId);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Create new employeetimeentry
 * Sanjeev Gunasekaran 200089
 * @public
 */
export const create = async (payload, usrr) => {
  try {
    // Validate the incoming request
    const { error } = createEmployeetimeentrySchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Create new employeetimeentry by calling the employeetimeentry services

    return await basic.create(payload, usrr);
  } catch (error) {
    // return response with status code
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Update existing employeetimeentry
 * Sanjeev Gunasekaran 200089
 * @public
 */
export const update = async (payload, id, usrr) => {
  try {
    // Validate the incoming request
    const { error } = updateEmployeetimeentrySchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Update an employeetimeentry by calling the employeetimeentry services and return response

    return await basic.update(payload, id, usrr);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Get employeetimeentry list
 * Sanjeev Gunasekaran 200089
 * @public
 */
export const list = async () => {
  try {
    // Return employeetimeentry list by calling the employeetimeentry services
    return await basic.list();
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Delete employeetimeentry
 * Sanjeev Gunasekaran 200089
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
    // Remove the employeetimeentry by his/her id by calling the employeetimeentry services
    return await basic.remove(id, usrr);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
