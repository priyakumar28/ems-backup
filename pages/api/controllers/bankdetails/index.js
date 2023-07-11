import { parseRequestFiles } from "../../helpers";
const Joi = require("joi");
const {
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED
} = require("../../config/status_codes");
const { bank } = require("../../services/bankdetails");
const { ac } = require('../../middlewares/accesscontrol');
const { response } = require('../../helpers');
const {
  getById: getBankDetailsSchema,
  create: createBankDetailsSchema,
  update: updateBankDetailsSchema,
  delete: deleteBankDetailsSchema,
} = require("../../validations/bankdetails");
const requireAuth = require("../../middlewares/_requireAuth");
const { module_helpers } = require("../../config/module_helpers");
let moduleCategory = module_helpers["Employee management"];
let permission, modules;

export default requireAuth(async (req, res) => {
  const {
    query: { id, type, emp_id },
    method,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);

  let payload = await parseRequestFiles(req);

  let keys = {
    status: Joi.valid('Pending', 'Approved', 'Rejected'),
    reason_for_rejection: Joi.when('status', {
      is: Joi.string().valid('Rejected'),
      then: Joi.string().required(),
      otherwise: Joi.string().allow(null),
    }).label("Reason for rejection")
  }

  if (method === "POST") {
    createBankDetailsSchema.body = createBankDetailsSchema.body.keys(keys);
  } else if (method === "PUT") {
    updateBankDetailsSchema.body = updateBankDetailsSchema.body.keys(keys);
  }

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  
  switch (method) {
    case "GET":
      if (id && type == "sendmail" && (permission[moduleCategory.VIEW_BANK_DETAILS] || req.user.employee.id == req.query.emp_id)) {
        result = await sendBankDetailsToMail(id, req.user);
      } else if (id && (permission[moduleCategory.VIEW_BANK_DETAILS] || req.user.employee.id == req.query.emp_id)) {
        result = await getById(id, req.user);
      } else if (permission[moduleCategory.VIEW_BANK_DETAILS]) {
        result = await list();
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_BANK_DETAILS] || req.user.employee.id === payload.fields.emp_id) {
        result = await create(payload, req.user);
      }
      break
    case "PUT":
      if (permission[moduleCategory.UPDATE_BANK_DETAILS] || req.user.employee.id === payload.fields.emp_id) {
        result = await update(payload, req.query.id, req.user);
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_BANK_DETAILS] || req.user.employee.id === payload.fields.emp_id) {
        result = await remove(req.query.id);
      }
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

export const getById = async (id, usrr) => {
  try {
    const { error } = getBankDetailsSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await bank.getById(id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Create new employee
 * @public
 */
export const create = async (payload, usrr) => {
  try {    
    const { error } = createBankDetailsSchema.body.validate(payload.fields);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    payload["createdAt"] = new Date();
    payload["updatedAt"] = new Date();
    return await bank.create(payload, usrr, permission);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Update existing employee
 * @public
 */
export const update = async (payload, id, usrr) => {
 
  try {
    let a = {};
    a["work_email"] = payload.fields.email;
    a["first_name"] = payload.fields.name;
    delete payload.fields.email;
    delete payload.fields.name;
    if (payload.fields.account_number.includes("*")) {
      delete payload.fields.account_number;
    }
    const { error } = updateBankDetailsSchema.body.validate(payload.fields);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await bank.update(payload, id, usrr, permission, a);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Get employee list
 * @public
 */
export const list = async (usrr) => {
  try {
    return await bank.list(usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Send email
 * @public
 */
export const sendBankDetailsToMail = async (id, user) => {
  try {
    return await bank.sendBankDetailsToMail(id, user);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const config = {
  api: {
    bodyParser: false
  }
}