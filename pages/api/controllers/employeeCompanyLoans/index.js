const { OK, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, UNAUTHORIZED } = require('../../config/status_codes');
const requireAuth = require('../../middlewares/_requireAuth');
const employeeCompanyLoans = require('../../services/employeecompanyloans');

const {
    getById: getEmployeeCompanyLoansSchema,
    create: createEmployeeCompanyLoansSchema,
    update: updateEmployeeCompanyLoansSchema,
    list: listEmployeeCompanyLoansSchema,
    delete: deleteEmployeeCompanyLoansSchema
} = require('../../validations/employeecompanyloans');
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
// text case call getbyid => id
const getById = async (id) => {
  try {
    const { error } = getEmployeeCompanyLoansSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeCompanyLoans.getById(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const remove = async (id) => {
  try {
    // let id = req.query.id;
    const { error } =deleteEmployeeCompanyLoansSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeCompanyLoans.remove(id);
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const create = async (payload) => {
  try {
    // let payload = req.body;
    const { error } = createEmployeeCompanyLoansSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeCompanyLoans.create(payload);
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const update = async (payload, id) => {
  try {
    const { error } = updateEmployeeCompanyLoansSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await employeeCompanyLoans.update(payload, id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const list = async () => {
  try {
    return await employeeCompanyLoans.list();
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};