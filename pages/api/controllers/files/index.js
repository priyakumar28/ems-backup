const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/files/index");
const {
  getById: getFilesSchema,
  create: createFilesSchema,
  update: updateFilesSchema,
  remove: deleteFiles,
} = require("../../validations/files");

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
      result = await remove(req.query);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

/**
 * Get all employees and send as response.
 * @public
 */
const getById = async (id) => {
  try {
    const { error } = getFilesSchema.query.validate({ id });

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

/**
 * Create new employee
 * @public
 */
const create = async (payload) => {
  try {
    // Validate the incoming request
    const { error } = createFilesSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Create new employee by calling the employee services
    return await basic.create(payload);
    // return response with status code
  } catch (error) {
    // return response with status code
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Update existing employee
 * @public
 */

const update = async (payload, id) => {
  try {
    const { error } = updateFilesSchema.body.validate(payload);
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

/**
 * Get employee list
 * @public
 */
const list = async () => {
  try {
    return await basic.list();
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

/**
 * Delete employee
 * @public
 */

const remove = async (id) => {
  try {
    const { error } = deleteFiles.query.validate(id);
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
