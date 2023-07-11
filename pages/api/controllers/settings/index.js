const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/settings");
const requireAuth = require("../../middlewares/_requireAuth");
const { parseRequestFiles } = require("../../helpers");
const _ = require("lodash");
import { response } from "../../helpers";

const { update: updateSettingsSchema } = require("../../validations/settings");
import { ac } from "../../middlewares/accesscontrol";
const { module_helpers } = require("../../config/module_helpers");
let moduleCategory = module_helpers["Settings Management"];



export const config = {
  api: {
    bodyParser: false,
  },
};

export default requireAuth(async (req, res) => {
  const { method,user } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  let sitesettingsFields = [
    "site_title",
    "favicon",
    "logo",
    "about_us",
    "theme_mode"
  ]
  let employeeConfigurationSettingsFields = [
    "pancard_max_upload_days"
  ]
  let permissionsCheck = await ac(
    user.roles,
    Object.values(moduleCategory),
 user.email
  );
  switch (method) {
    case "GET":
      result = await list();
      let data1 = result.data;
      for (const key in permissionsCheck) {
        if (key == moduleCategory.SITE_SETTINGS && !permissionsCheck[key]) {
          data1 = data1.filter((x) => !sitesettingsFields.includes(x.name));
        } else if (key == moduleCategory.EMPLOYEE_CONFIGURATION_SETTINGS && !permissionsCheck[key]) {
          data1 = data1.filter((x) => !employeeConfigurationSettingsFields.includes(x.name));
        }      
      }
      result = { message: "Settings list is here", data: data1 };
      break;
    case "PUT":
      let payload = await parseRequestFiles(req);
      for (const key in permissionsCheck) {
      
        if (key == moduleCategory.SITE_SETTINGS && !permissionsCheck[key]) {
          sitesettingsFields.map((x) => {
            delete payload.fields[x.name]
            delete payload.files[x.name]
          } )
          
        } else if (key == moduleCategory.EMPLOYEE_CONFIGURATION_SETTINGS && !permissionsCheck[key]) {
          employeeConfigurationSettingsFields.map((x) => delete payload.fields[x.name])
        }   
      
      }
      result = await update(payload);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

export const update = async (payload) => {
  try {
    let ss_fields = ['ss_users', 'logo', 'favicon', 'site_title', 'about_us', 'theme_mode'];
    let pc_fields = ['pc_users', 'pancard_max_upload_days'];
    let payloadKeys = Object.keys(payload.fields);
    let userKey;
    if (_.intersection(payloadKeys, ss_fields)?.length > 0) {
      userKey = 'ss_users';
    } else if (_.intersection(payloadKeys, pc_fields)?.length > 0) {
      userKey = 'pc_users';
    }
    let emails = [];
    if (payload.fields[userKey]?.length > 0) {
      if (_.intersection(payloadKeys, ss_fields)?.length > 0) {
        payload.fields[userKey] = JSON.parse(payload.fields[userKey]);
      }
      emails = payload.fields[userKey].map((x) => {
        return { email: x.label, username: x.label.replace("@bassure.com", "") };
      });
    }

    delete payload.fields[userKey];

    const { error } = updateSettingsSchema.body.validate(payload.fields);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.update(payload, emails);
  } catch (error) {
    
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const list = async () => {
  try {
    return await basic.list();
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
