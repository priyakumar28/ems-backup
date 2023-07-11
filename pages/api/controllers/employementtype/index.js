const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employementtype");
const requireAuth = require("../../middlewares/_requireAuth");
const { response } = require("../../helpers");
const {
  getById: getEmployeeSchema,
  create: createEmployementtyprSchema,
  update: updateEmployeeSchema,
  list: listEmployementtypeSchema,
  remove: deleteEmployee,
} = require("../../validations/employementtype");

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
        result = await list(req, res);
      }
      break;
    case "POST":
      result = await create(req, res);
      break;
    case "PUT":
      result = await update(req, res);
      break;
    case "DELETE":
      result = await remove(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});
/**
 * Get all employementtype and send as response.
 * @public
 */
export const getById = async (req, res) => {
  try {
    let id = req.query.id;

    // Validate the incoming request
    const { error } = getEmployeeSchema.body.validate();
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    // Return employementtype by his/her id by calling the employementtype services
    let { code, ...employementtypeGetByIdObj } = await basic.getById(id);
    // return response with status code
    return res.status(code).send(employementtypeGetByIdObj);
  } catch (error) {
    // Return exception
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

/**
 * Create new employementtype
 * @public
 */
 export const create = async (req, res) => {
    try {
        let payload = req.body;
        // Validate the incoming request
        const { error } = createEmployementtyprSchema.body.validate(payload);
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message.replace(/\"/g, '')).join(',');
            return res.status(UNPROCESSABLE_ENTITY).json({ message });
        }
        // Create new employementtype by calling the employementtype services
        let { code, ...employementtypeObj } = await basic.create(payload);
        // return response with status code
        return res.status(code).send(employementtypeObj);
    } catch (error) {
        // return response with status code
        return res.status(INTERNAL_SERVER_ERROR).send({message: error.message});
    }
    // Create new employementtype by calling the employementtype services
    let { code, ...employementtypeObj } = await basic.create(payload);
    // return response with status code
    return res.status(code).send(employementtypeObj);
  } 
/**
 * Update existing employee
 * @public
 */
export const update = async (req, res) => {
  try {
    let payload = req.body;
    let id = req.query.id;

    // Validate the incoming request
    const { error } = updateEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    // Update an employementtype by calling the employementtype services and return response
    let { code, ...employementtypeUpdateObj } = await basic.update(payload, id);
    // return response with status code
    return res.status(code).send(employementtypeUpdateObj);
  } catch (error) {
    // Return exception
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

/**
 * Get employee list
 * @public
 */
export const list = async (_req, res) => {
  try {
    // Return employementtype list by calling the employementtype services
    let { code, ...employementtypeListObj } = await basic.list();
    // return response with status code
    return res.status(code).send(employementtypeListObj);
  } catch (error) {
    // Return exception
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

/**
 * Delete employee
 * @public
 */
export const remove = async (req, res) => {
  try {
    let id = req.query.id;

    // Validate the incoming request
    const { error } = deleteEmployee.body.validate();
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    // Remove the employementtype by his/her id by calling the employementtype services
    let { code, ...employementtypeRemoveIdObj } = await basic.remove(id);
    // return response with status code
    return res.status(code).send(employementtypeRemoveIdObj);
  } catch (error) {
    // Return exception
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
