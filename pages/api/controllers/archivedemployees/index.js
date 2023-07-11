const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED
} = require("../../config/status_codes");
const arhivedemployees = require("../../services/employees/archivedemployees");
const {
  getById: getArchivedEmployeeSchema,
  create: createArchivedEmployeeSchema,
  update: updateArchivedEmployeeSchema,
  delete: deleteArchivedEmployeeSchema,
} = require("../../validations/archivedemployees");
const requireAuth = require("../../middlewares/_requireAuth");
const { response } = require('../../helpers');

export default requireAuth(async (req, res) => {
  const { 
    query: { id },
    method
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
 * Get archived employee by id and send as response.
 * @public
 */
const getById = async (id) => {
  try {
    //let id = req.query.id;
    const { error } = getArchivedEmployeeSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY,message);
    }
    return await arhivedemployees.getById(id);
    //return res.status(code).send(archivedEmployeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR,error.message);
  }
};

/**
 * Create new archived employee
 * @public
 */
const create = async (payload) => {
  try {
    const { error } = createArchivedEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY,message);
    }
    return await arhivedemployees.create(payload);
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR,error.message);
  }
};

/**
 * Update existing archived employee
 * @public
 */
const update = async (payload,id) => {
  try {
   
    const { error } = updateArchivedEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY,message);
    }
    return await arhivedemployees.update(
      payload,
      id
    );
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR,error.message);
  }
};

/**
 * Get archived employee list
 * @public
 */
const list = async () => {
  try {
    return await arhivedemployees.list();
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR,error.message);
  }
};

/**
 * Delete archived employee
 * @public
 */
const remove = async (id) => {
  try {
    
    const { error } = deleteArchivedEmployeeSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY,message);
    }
    return await arhivedemployees.remove(id);
   
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR,error.message);
  }
};
