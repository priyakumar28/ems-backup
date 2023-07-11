import { result } from "lodash";

const {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED
} = require("../../config/status_codes");
const requireAuth = require("../../middlewares/_requireAuth");
const {
  models: { clients:Clients, projects: Projects },
} = require("../../models");
const { basic } = require("../../services/projects");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_EMP_EXCEL_SHEET_TYPES,
  ALLOWED_EMP_EXCEL_SHEET_SIZE,
} = require("../../helpers");

const { bulkCreate: bulkCreateSchema } = require("../../validations/projects");

const getRawBody = require("raw-body");
export const config = {
  api: {
    bodyParser: false,
  },
};
export default requireAuth(async (req, res) => {
  const {
    query: { type },
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (type) {
    case "downloadSample":
      result = await downloadSample(req, res);
      break;
    case "exportProjects":
      result = await exportProjects(req, res);
      break;
    // //write function to import
    default:
      result = response(false, "Invalid request");
  }
  return res.json(result);
});


const exportProjects = async (req, res) => {
  try {
    let column = req.query.column ? req.query.column : null;
    let value = req.query.value;    
    let whereObj = null;
    if (column !== "all" && value !== "all") {
      whereObj = {};
      whereObj[column] = value;
    }
    let { code, ...projectsList } = await basic.list(whereObj);
    return res.status(code).send(projectsList);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
