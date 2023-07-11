const {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED
} = require("../../config/status_codes");
const requireAuth = require("../../middlewares/_requireAuth");
const {
  models: { employee: Employee },
} = require("../../models");
const { basic } = require("../../services/employeetimesheets");

const {
  bulkCreate: bulkCreateSchema,
} = require("../../validations/employeetimesheets");

const getRawBody = require("raw-body");
export const config = {
  api: {
    bodyParser: false,
  },
};

export default requireAuth(async (req, res) => {
  const {
    query: { type }
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (type) {
    case "downloadSample":
      result = await downloadSample(req, res);
      break;
    case "exportTimesheets":
      result = await exportTimesheets(req, res);
      break;
    // //write function to import
    default:
      result = response(false, "Invalid request");
  }
  return res.json(result);
});

const exportTimesheets = async (req, res) => {
  try {
    let column = req.query.column ? req.query.column : null;
    let value = req.query.value;
    let projectId = req.query.projectId;
    let whereObj = { project: projectId };
    if (column !== "all" && value !== "all") {
      whereObj = { project: projectId };
      whereObj[column] = value;
    }
    let { code, ...employeeTimesheetsList } = await basic.list(
      whereObj,
      projectId
    );
    return res.status(code).send(employeeTimesheetsList);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
