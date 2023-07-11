const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../../config/status_codes');
const requireAuth = require('../../middlewares/_requireAuth');
const basic = require('../../services/user/users');
const { response } = require('../../helpers');
const { module_helpers } = require('../../config/module_helpers');
const { ac } = require("../../middlewares/accesscontrol");
const getRawBody = require('raw-body');
export const config = {
  api: {
    bodyParser: false,
  },
};
let moduleCategory = module_helpers["User management"];
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;
moduleCategory.VIEW_EMPLOYEES =
  module_helpers["Employee management"].VIEW_EMPLOYEES;
let permission, modules;

export default requireAuth(async (req, res) => {
  const {
    query: { type },
    user,
  } = req;
  modules = Object.values(moduleCategory);
  permission = await ac(req.user.roles, modules, req.user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (type) {
    case "getbyUserLevel":
      result = await getbyUserLevel();
      break;
    case "checkUserAvailability":
      let { data } = await getbyUserLevel();
      result = { success: true, message: "User available", data: user, admins: data };
      break;
    case "currentUserUpdate":
      result = await currentUserUpdate(req, user, permission);
      break;
    default:
      result = { success: false, message: "Invalid request" };
  }
  return res.json(result);
});

const currentUserUpdate = async (req, user,perm) => {
  try {
    req = (req?.query?.update_type == "profile_pic") ? req : JSON.parse(await getRawBody(req));
    return await basic.update(req, user.id, req?.query?.update_type, perm);
  } catch (error) {
    return { code: INTERNAL_SERVER_ERROR, message: error.message };
  }
};

export const getbyUserLevel = async () => {
  try {
    return await basic.getbyUserLevel();
  } catch (error) {
    return { code: INTERNAL_SERVER_ERROR, message: error.message };
  }
};
