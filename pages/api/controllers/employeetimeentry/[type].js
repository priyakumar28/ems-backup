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
const { basic } = require("../../services/employeetimeentry");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_EMP_EXCEL_SHEET_TYPES,
  ALLOWED_EMP_EXCEL_SHEET_SIZE,
} = require("../../helpers");

const {
  bulkCreate: bulkCreateSchema,
} = require("../../validations/employeetimeentry");

//const excelToJSON = require('convert-excel-to-json');
const getRawBody = require("raw-body");
export const config = {
  api: {
    bodyParser: false,
  },
};
export default requireAuth(async (req, res) => {
  const {
    query: { type },
    user,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (type) {
    case "downloadSample":
      result = await downloadSample(req, res);
      break;
    case "exportEmployeetimeEntry":
      result = await exportEmployeetimeEntry(req, res);
      break;
    // //write function to import
    default:
      result = response(false, "Invalid request");
  }
  return res.json(result);
});

const exportEmployeetimeEntry = async (req, res) => {
  try {
    let column = req.query.column ? req.query.column : null;
    let value = req.query.value;
    let employeeId = req.query.employeeId ? parseInt(req.query.employeeId) : null;
    let whereObj = {employee : employeeId };
    if (column !== "all" && value !== "all") {
      whereObj = { employee: employeeId };
      whereObj[column] = value;
    }
    let { code, ...employeetimeentryList } = await basic.list(
      whereObj,
      employeeId
    );
    return res.status(code).send(employeetimeentryList);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
