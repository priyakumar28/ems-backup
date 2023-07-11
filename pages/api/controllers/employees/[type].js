import { log } from "handlebars";

const {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../../config/status_codes");
const requireAuth = require("../../middlewares/_requireAuth");
const {
  models: { users: Users, employees: Employees, settings: Settings },
} = require("../../models");
const { basic } = require("../../services/employees");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_PROFILE_PIC_TYPES,
  ALLOWED_PROFILE_SIZE,
  ALLOWED_EMP_EXCEL_SHEET_TYPES,
  ALLOWED_EMP_EXCEL_SHEET_SIZE,
  response,
} = require("../../helpers");
const { bulkCreate: bulkCreateSchema } = require("../../validations/employees");
const getRawBody = require("raw-body");
const EmployeeEventEmitter = require("../../events/employee/basic");
const settingsResource = require("../../resources/settings");

const { ac } = require("../../middlewares/accesscontrol");
const { module_helpers } = require("../../config/module_helpers");

let moduleCategory = module_helpers["Employee management"];
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;
moduleCategory.VIEW_USERS = module_helpers["User management"].VIEW_USERS; 
moduleCategory.VIEW_DEPARTMENTS = module_helpers["Department management"].VIEW_DEPARTMENTS;
moduleCategory.ASSIGN_USER_ROLES =
  module_helpers["User management"].ASSIGN_USER_ROLES;
moduleCategory.VIEW_TRAINING_SESSIONS =
  module_helpers["Training sessions management"].VIEW_TRAINING_SESSIONS;
let permission, modules;

let HOSTURL;
export const config = {
  api: {
    bodyParser: false,
  },
};
export default requireAuth(async (req, res) => {
  const {
    query: { type },
  } = req;

  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);

  HOSTURL = req.headers.referer.slice(0, 22);
  let payload,
    result = { code: BAD_REQUEST, message: "Invalid request" };
  switch (type) {
    case "downloadSample":
      result = await downloadSample();
      // write the file to the response (should prompt user to download or open the file)
      // res.setHeader('Content-Type', objFileProps.file_type);
      // res.setHeader('Content-Length', objFileProps.file_size);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=employees_import_sample_format.xlsx`
      );
      res.write(result, "binary");
      res.end();
      return res;
    case "profilePicUpdate":
      payload = await parseRequestFiles(req);
      result = await profilePicUpdate(payload, req.query.id);
      break;
    case "importEmployees":
      payload = [await getRawBody(req)];
      result = await importEmployees(payload);
      break;
    case "exportEmployees":
      result = await exportEmployees(req.query.column, req.query.value);
      break;
    case "resendWelcomeEmail":
      payload = await parseRequestFiles(req);
      result = await resendWelcomeEmail(payload.fields, payload.fields.id);
      break;
    default:
      result = { code: BAD_REQUEST, message: "Invalid request" };
  }
  return res.json(result);
});
const downloadSample = async () => {
  try {
    const resp = await fetch(
      `https://ems-document.s3.ap-south-1.amazonaws.com/import_samples/employees/employees_import_sample_format.xlsx`
    );
    // get the file information from the external API
    const resBlob = await resp.blob();
    const resBufferArray = await resBlob.arrayBuffer();
    const resBuffer = Buffer.from(resBufferArray);
    if (!resp.ok) throw new Error(`unexpected response ${resp.statusText}`);
    return resBuffer;
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, "downloading failed");
  }
};
const exportEmployees = async (column, value) => {
  try {
    let whereObj = null;
    if (column !== "all" && value !== "all") {
      whereObj = {};
      whereObj[column] = value;
    }
   
    return await basic.list(whereObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, "exporting employees failed");
  }
};
const importEmployees = async (payload) => {
  try {
    payload = JSON.parse(payload);
    if (Object.keys(payload).length === 0) {
      return res.status(OK).json({ message: "empty_data" });
    }
    payload = payload.Sheet1;
    payload = payload.map((item) => {
      return {
        employee_id: item["Employee Code"],
        first_name: item["First Name"],
        last_name: item["Last Name"],
        work_phone: item["Phone Number"],
        work_email: item["Office Email Id"],
        status: item["Status"],
      };
    });
    let initialCount = payload.length;
    const errors1 = [
      {
        message: "The records were not imported due to the following errors: ",
      },
    ];
    for (let index = payload.length - 1; index >= 0; --index) {
      const i = payload[index];
      const { error } = bulkCreateSchema.body.validate(i);
      if (error) {
        errors1.push({ message: `${i.employee_id} -  ${error.message}` });
        payload.splice(index, 1);
      }
    }
    return await basic.bulkCreate(payload, errors1, initialCount);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, "importing employees failed");
  }
};
const profilePicUpdate = async (payload, id) => {
  try {
    let employee = await Employees.findOne({ where: { id } });
    if (employee instanceof Employees) {
      // let payload = await parseRequestFiles(req);
      if (payload?.files && Object.entries(payload?.files)?.length > 0) {
        let file = payload.files.profile_pic;
        let path = `profile_pictures/employees/${id}`;
        let { success, ...result } = await upload(
          file,
          path,
          ALLOWED_PROFILE_PIC_TYPES,
          ALLOWED_PROFILE_SIZE,
          false
        );
        if (success) {
          employee.profile_pic = result.url;
          await employee.save();
          let user = await Users.findOne({
            where: { email: employee.work_email },
          });
          if (user instanceof Users) {
            user.profile_pic = result.url;
            await user.save();
          }
          employee = (await basic.getById(employee.id, permission)).data;
          return response(OK, "Employee profile picture updated", employee);
        } else {
          return response(
            INTERNAL_SERVER_ERROR,
            "profile picture update failed"
          );
        }
      } else {
        return response(BAD_REQUEST, "Please provide profile picture");
      }
    }
    return response(NOT_FOUND, "Employee not found");
  } catch (error) {
    console.log(error);
    return response(INTERNAL_SERVER_ERROR, "profile pic update failed");
  }
};

const resendWelcomeEmail = async (payload,id) => {
  let MAILSET = settingsResource.transform(
    await Settings.findOne({ where: { name: "change" } })
  );
  let b = EmployeeEventEmitter.emit("employee_created", payload, HOSTURL, MAILSET.value);
  console.log("sssss",b)
  if (b) {
    let newPayload = {is_welcome_email_sent:true}
    await Employees.update(newPayload, { where: { id } });
    // let employee = await Employees.findOne({ where: { id }, include: "department_department" });
    let employee = (await basic.getById(id, permission)).data;
    console.log("nnnnnnnn", employee);
    return response(OK, "Welcome Email Sent", employee);
  }
  return response(INTERNAL_SERVER_ERROR, "error in sending Welcome Email")
}

// const {
//   OK,
//   INTERNAL_SERVER_ERROR,
//   NOT_FOUND,
//   BAD_REQUEST,
// } = require("../../config/status_codes");
// const requireAuth = require("../../middlewares/_requireAuth");
// const {
//   models: { users: Users, employees: Employees },
// } = require("../../models");
// const { basic } = require("../../services/employees");
// const { upload } = require("../../services/upload");
// const {
//   parseRequestFiles,
//   ALLOWED_PROFILE_PIC_TYPES,
//   ALLOWED_PROFILE_SIZE,
//   ALLOWED_EMP_EXCEL_SHEET_TYPES,
//   ALLOWED_EMP_EXCEL_SHEET_SIZE,
// } = require("../../helpers");

// const { bulkCreate: bulkCreateSchema } = require("../../validations/employees");

// const getRawBody = require("raw-body");
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// export default requireAuth(async (req, res) => {
//   const {
//     query: { type }
//   } = req;

//   switch (type) {
//     case "downloadSample":
//       return await downloadSample(req, res);
//     case "profilePicUpdate":
//       return await profilePicUpdate(req, res);
//     case "importEmployees":
//       return await importEmployees(req, res);
//     case "exportEmployees":
//       return await exportEmployees(req, res);
//     // //write function to import
//     default:
//       return res.status(404).json({ success: false, message: "Invalid request" });
//   }
// });

// const downloadSample = async (_req, res) => {
//   try {
//     const response = await fetch(
//       `https://ems-document.s3.ap-south-1.amazonaws.com/import_samples/employees/employees_import_sample_format.xlsx`
//     );

//     // get the file information from the external API
//     const resBlob = await response.blob();
//     const resBufferArray = await resBlob.arrayBuffer();
//     const resBuffer = Buffer.from(resBufferArray);
//     if (!response.ok)
//       throw new Error(`unexpected response ${response.statusText}`);
//     // write the file to the response (should prompt user to download or open the file)
//     // res.setHeader('Content-Type', objFileProps.file_type);
//     // res.setHeader('Content-Length', objFileProps.file_size);
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=employees_import_sample_format.xlsx`
//     );
//     res.write(resBuffer, "binary");
//     res.end();

//   } catch (error) {
//     return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
//   }
// };

// const exportEmployees = async (req, res) => {
//   try {
//     let column = req.query.column;
//     let value = req.query.value;
//     let whereObj = null;
//     if (column !== "all" && value !== "all") {
//       whereObj = {};
//       whereObj[column] = value;
//     }
//     let { code, ...employessList } = await basic.list(whereObj);
//     return res.status(code).send(employessList);
//   } catch (error) {
//     return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
//   }
// };

// const importEmployees = async (req, res) => {
//   try {
//     let payload = [await getRawBody(req)];
//     payload = JSON.parse(payload);
//     if (Object.keys(payload).length === 0) {
//       return res.status(OK).json({ message: "empty_data" });
//     }
//     payload = payload.Sheet1;
//     payload = payload.map((item) => {
//       return {
//         employee_id: item["Employee Code"],
//         first_name: item["First Name"],
//         last_name: item["Last Name"],
//         work_phone: item["Phone Number"],
//         work_email: item["Office Email Id"],
//         status: item["Status"],
//       };
//     });
//     let initialCount = payload.length;

//     const errors1 = [
//       {
//         message: "The records were not imported due to the following errors: ",
//       },
//     ];
//     for (let index = payload.length - 1; index >= 0; --index) {
//       const i = payload[index];
//       const { error } = bulkCreateSchema.body.validate(i);
//       if (error) {
//         errors1.push({ message: `${i.employee_id} -  ${error.message}` });

//         payload.splice(index, 1);
//       }
//     }

//     let { code, ...results } = await basic.bulkCreate(
//       payload,
//       errors1,
//       initialCount
//     );
//     return res.status(code).json(results);
//   } catch (error) {
//     return res
//       .status(INTERNAL_SERVER_ERROR)
//       .send({ message: "Error in importing employees" });
//   }
// };

// const profilePicUpdate = async (req, res) => {
//   try {
//     let employee = await Employees.findOne({ where: { id: req.query.id } });
//     if (employee instanceof Employees) {
//       let payload = await parseRequestFiles(req);
//       if (payload?.files && Object.entries(payload?.files)?.length > 0) {
//         let file = payload.files.profile_pic;
//         let path = `profile_pictures/employees/${req.query.id}`;
//         let { success, ...result } = await upload(
//           file,
//           path,
//           ALLOWED_PROFILE_PIC_TYPES,
//           ALLOWED_PROFILE_SIZE
//         );
//         if (success) {
//           employee.profile_pic = result.url;
//           await employee.save();
//           let user = await Users.findOne({
//             where: { email: employee.work_email },
//           });
//           if (user instanceof Users) {
//             user.profile_pic = result.url;
//             await user.save();
//           }

//           employee = (await basic.getById(employee.id)).data;
//           return res.status(OK).send({
//             message: "Employee profile picture updated",
//             data: employee,
//           });
//         } else {
//           return res
//             .status(INTERNAL_SERVER_ERROR)
//             .send({ message: res.message });
//         }
//       } else {
//         return res
//           .status(BAD_REQUEST)
//           .send({ message: "Please provide profile picture" });
//       }
//     }
//     return res.status(NOT_FOUND).send({ message: "Employee not found" });
//   } catch (error) {
//     return res

//       .status(INTERNAL_SERVER_ERROR)
//       .send({ message: "Error in updating profile picture" });
//   }
// };
