const {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../../config/status_codes");
const requireAuth = require("../../middlewares/_requireAuth");
const {
  models: { clients: Clients, projects: Projects },
} = require("../../models");
const { basic } = require("../../services/clients");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_EMP_EXCEL_SHEET_TYPES,
  ALLOWED_EMP_EXCEL_SHEET_SIZE,
  response
} = require("../../helpers");

const { bulkCreate: bulkCreateSchema } = require("../../validations/clients");

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

  switch (type) {
    case "downloadSample":
      return await downloadSample(req, res);
    case "exportClients":
      var result = await exportClients(req.query.column, req.query.value);
      return res.json(result)
    
    default:
      res.status(404).json({ success: false, message: "Invalid request" });
  }
});

const exportClients = async (column,value) => {
  try {
     column = column ? column : null;
    
    let whereObj = null;
    if (column !== "all" && value !== "all") {
      whereObj = {};
      whereObj[column] = value;
    }
    return await basic.list(
      whereObj
    );
    
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR,error.message);
  }
};
