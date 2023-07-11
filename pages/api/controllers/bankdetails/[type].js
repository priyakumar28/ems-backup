import { log } from "handlebars";
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
const { bank } = require("../../services/bankdetails");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_EMP_EXCEL_SHEET_TYPES,
  ALLOWED_EMP_EXCEL_SHEET_SIZE,
} = require("../../helpers");

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
  //let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (type) {
    case "downloadSample":
      return await downloadSample(req, res);
      
    case "exportBankDetails":
        var result = await exportBankDetails(req.query.column,req.query.value);
        return res.json(result)
      //result =  await exportBankDetails(req, res);
     
    
    default:
        res.status(404).json({success:false , message:"Invalid request"})
      //result = response(false, "Invalid request");
  }
  return res.json(result);
});
const exportBankDetails = async (column,value) => {
  try {
    console.log("/////",column,value);
    column = column ? column : null;
    let whereObj = null;
    //let column = req.query.column ? req.query.column : null;
    // let value = req.query.value;
    // let employeeId = req.query.employeeId ? parseInt(req.query.employeeId) : null;
    // let whereObj = { employee: employeeId };
    if (column !== "all" && value !== "all") {
      whereObj = { };
      whereObj[column] = value;
    }
    return await bank.list(
      whereObj,
     console.log("lsls",whereObj)
    );
   
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR,error.message);
  }
};