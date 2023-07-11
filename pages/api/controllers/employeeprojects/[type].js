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
  models: { clients: Clients, projects: Projects },
} = require("../../models");
const { basic } = require("../../services/employeeprojects");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_EMP_EXCEL_SHEET_TYPES,
  ALLOWED_EMP_EXCEL_SHEET_SIZE,
} = require("../../helpers");

const {
  bulkCreate: bulkCreateSchema,
} = require("../../validations/employeeprojects");

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
      result =  await downloadSample(req, res);
      break;
    case "exportEmployeeProjects":
      result =  await exportEmployeeProjects(req, res);
      break;
    // //write function to import
    default:
      result = response(false, "Invalid request");
  }
  return res.json(result);
});

const exportEmployeeProjects = async (req, res) => {
  try {
    let column = req.query.column ? req.query.column : null;
    let value = req.query.value;
    let projectId = req.query.projectId ? parseInt(req.query.projectId) : null;
    let whereObj = { project: projectId };
    if (column !== "all" && value !== "all") {
      whereObj = { project: projectId };
      whereObj[column] = value;
    }
    let { code, ...employeeprojectsList } = await basic.list(
      whereObj,
      projectId
    );
    return res.status(code).send(employeeprojectsList);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
