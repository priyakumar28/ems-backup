const {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const employerDocuments = require("../../services/employerdocuments");
const { parseRequestFiles, response } = require("../../helpers");
const requireAuth = require("../../middlewares/_requireAuth");
import { ac } from "../../middlewares/accesscontrol";
const { module_helpers } = require("../../config/module_helpers");
const { Op } = require("sequelize");

let {
  VIEW_HR_ASSESMENT_FORMS,
  VIEW_L1_ASSESMENT_FORMS,
  VIEW_REX_APPROVAL_FORMS
} = module_helpers["Sensitive documents"];

export const config = {
  api: {
    bodyParser: false,
  },
};

let allowedDocTypes = [];
let loggedInUser;

export default requireAuth(async (req, res) => {
  let checkPermissions;
  let payload = await parseRequestFiles(req);
  req['body'] = payload.fields;
  req['files'] = payload.files;
  const {
    query: { id, doc_type },
    method,
    body,
    files,
    user
  } = req;

  loggedInUser = user;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      checkPermissions = await ac(loggedInUser.roles, [VIEW_HR_ASSESMENT_FORMS, VIEW_L1_ASSESMENT_FORMS, VIEW_REX_APPROVAL_FORMS], loggedInUser.email);
      if (id) {
        result = await getDocumentPassword(id, checkPermissions);
      } else {
        if (checkPermissions[VIEW_HR_ASSESMENT_FORMS]) allowedDocTypes.push("HR assessment forms");
        if (checkPermissions[VIEW_L1_ASSESMENT_FORMS]) allowedDocTypes.push("L1 assessment forms");
        if (checkPermissions[VIEW_REX_APPROVAL_FORMS]) allowedDocTypes.push("REX approval forms");
        if (allowedDocTypes.length > 0) {
          result = await list();
        }
      }
      break;
    case "POST":
      checkPermissions = await ac(loggedInUser.roles, [`Create ${body.doc_type}`], loggedInUser.email)
      if (checkPermissions[`Create ${body.doc_type}`]) {
        result = await create(body, files);
      }
      break;
    case "PUT":
      checkPermissions = await ac(loggedInUser.roles, [`Update ${body.doc_type}`], loggedInUser.email);
      if (checkPermissions[`Update ${body.doc_type}`]) {
        result = await update(body, id);
      }
      break;
    case "DELETE":
      checkPermissions = await ac(loggedInUser.roles, [`Delete ${doc_type}`], loggedInUser.email);
      if (checkPermissions[`Delete ${doc_type}`]) {
        result = await remove(id, doc_type);
      }

      break;
    default:
      res.setHeader("Allow", ["PUT", "GET", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

export const list = async () => {
  try {
    return await employerDocuments.list({
      doc_type: {
        [Op.in]: allowedDocTypes
      }
    });
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message, []);
  }
};

export const create = async (payload, files) => {
  try {
    return await employerDocuments.create(payload, files, loggedInUser);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message, []);
  }
};

export const update = async (payload, id) => {
  try {
    return await employerDocuments.update(payload, id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message, []);
  }
};

export const getDocumentPassword = async (id, perm) => {
  try {
    return await employerDocuments.getDocumentPassword(id, perm, loggedInUser);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, "Something went wrong", []);
  }
};

export const remove = async (id, doc_type) => {
  try {
    return await employerDocuments.remove(id, doc_type);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
