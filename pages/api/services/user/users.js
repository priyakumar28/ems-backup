const {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const {
  models: {
    users: Users,
    userroles: Userroles,
    modules: Modules,
    permissions: Permissions,
    employees: Employees,
    emergencycontacts: Emergencycontacts,
    bankdetails: Bankdetails,
    employeeeducations: Employeeeducations,
    employeedocuments: Employeedocuments,
    employeeskills: Employeeskills,
    nomineedetails: Nomineedetails,
  },
} = require("../../models");
const { Op } = require("sequelize");
const usersResource = require("../../resources/userstwo");
const usertwoResource = require("../../resources/users");
const { upload } = require("../../services/upload");
const {
  parseRequestFiles,
  ALLOWED_PROFILE_PIC_TYPES,
  ALLOWED_PROFILE_SIZE,
} = require("../../helpers");
const { ac } = require("../../middlewares/accesscontrol");
const employees = require("../../validations/employees");
const { module_helpers } = require("../../config/module_helpers");

let moduleCategory = {};
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;

let userroleAssoc = {
  model: Userroles,
  as: "users_userroles",
  include: [
    {
      model: Modules,
      as: "userroles_modules",
    },
    "userroles_assignmodules",
  ],
};
let empAssoc = {
  model: Employees,
  as: "employee_employee",
  include: [
    "emergencycontacts",
    "bankdetails",
    "employeeeducations",
    "employeedocuments",
    "employeeskills",
    "nomineedetails",
    "employee_employmenthistory",
  ],
};

let emailassoc = [empAssoc, "lang_supportedlanguage", userroleAssoc];
let associationstwo = [
  "employee_employee",
  "lang_supportedlanguage",
  userroleAssoc,
];
let associations = ["employee_employee", "lang_supportedlanguage"];
let modulePerm = ["View employees", "a"];
let newAssoc = [];

exports.getByIdOrEmailAuth = async (data) => {
  try {
    let userObj = await Users.findOne({
      where: data,
      include: emailassoc,
    });
    if (!userObj) {
      return response(NOT_FOUND, "Requested user not found");
    }
    return response(OK, "userDetail", usertwoResource.transform(userObj));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error);
  }
};

exports.getbyUserLevel = async () => {
  try {
    let userObj = await Users.findAll({
      where: { user_level: "Super Admin" },
    });
    if (!userObj) {
      return response(NOT_FOUND, "Requested user not found", []);
    }
    let a = userObj.map((x) => x.dataValues.email);
    return response(OK, "User available", a);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error, []);
  }
};

exports.getByIdOrEmail = async (data, permission) => {
  for (let i = 0; i < modulePerm.length; i++) {
    if (modulePerm[i] === "a") {
      newAssoc.push(associations[i]);
    } else if (permission[modulePerm[i]]) {
      newAssoc.push(associations[i]);
    }
  }
  if (permission["View roles"]) {
    newAssoc.push(userroleAssoc);
  }

  try {
    let userObj = await Users.findOne({
      where: data,
      include: newAssoc
    });
    if (!userObj) {
      return response(NOT_FOUND, "Requested user not found");
    }
    return response(OK, "userDetail", usersResource.transform(userObj));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error);
  }
};

exports.create = async (payload, permission) => {
  try {
    payload.username = payload.username
      ? payload.username
      : `${payload.email.split("@")[0]}.bassure`;
    let roles = payload.user_roles;
    delete payload.user_roles;
    let [userObj, created] = await Users.findOrCreate({
      where: { email: payload.email },
      defaults: payload,
    });
    if (!created) {
      return response(BAD_REQUEST, "User already exists", userObj);
    }
    if (roles && typeof roles === "object" && roles.length > 0) {
      await userObj.setUsers_userroles(roles);
    }
    userObj = (await this.getByIdOrEmail({ id: userObj.dataValues.id}, permission)).data;
    return response(OK, "New user created", userObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.bulkCreate = async (payload) => {
  let user_emails = payload.map((x) => x.email);
  let existingUsers = await Users.findAll({
    where: {
      email: {
        [Op.in]: user_emails,
      },
    },
  });
  if (existingUsers.length > 0) {
    let existed_user_emails = existingUsers.map((x) => x.email);
    const allowedUsersToCreate = payload.filter((object) => {
      return !existed_user_emails.includes(object.email);
    });
    payload = allowedUsersToCreate;
  }

  payload.map((x) => (x.username = `${x.email.split("@")[0]}.bassure`));
  let userObj = await Users.bulkCreate(payload);

  return response(OK, "New user created", usersResource.transform(userObj));
};

exports.update = async (payload, id, update_type = null, permission) => {
  try {
    let userObj = await Users.findOne({
      where: { id: id },
      include: "users_userroles",
    });
    if (!userObj) {
      return response(NOT_FOUND, "req user not found", userObj);
    }
    if (update_type == "role_update") {
      const rolesArr = await Userroles.findAll({
        where: {
          id: {
            [Op.in]: payload.role_update,
          },
        },
      });
      await userObj.setUsers_userroles(rolesArr);
    } else if (update_type == "profile_pic") {
      payload = await parseRequestFiles(payload);
      if (payload?.files && Object.entries(payload?.files)?.length > 0) {
        let file = payload.files.profile_pic;
        let path = `profile_pictures/users/${id}`;
        let { success, ...res } = await upload(
          file,
          path,
          ALLOWED_PROFILE_PIC_TYPES,
          ALLOWED_PROFILE_SIZE,
          false
        );
        if (success) {
          payload = { profile_pic: res.url };
        } else {
          return response(INTERNAL_SERVER_ERROR, res.message);
        }
      } else {
        return response(BAD_REQUEST, "Please provide profile picture");
      }
    }
    console.log(payload);
    await Users.update(payload, { where: { id: id } });
    userObj = (await this.getByIdOrEmail({ id }, permission)).data;
      await Employees.update(
        { profile_pic: userObj.profile_pic },
        { where: { work_email: userObj.email } }
      );
    return response(OK, "User updated", userObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (permission) => {
  for (let i = 0; i < modulePerm.length; i++) {
    if (modulePerm[i] == "a") {
      newAssoc.push(associations[i]);
    } else {
      if (permission[modulePerm[i]]) {
        newAssoc.push(associations[i]);
      }
    }
  }

  if (permission["View roles"]) {
    newAssoc.push({
      model: Userroles,
      as: "users_userroles",
    });
  }
  try {
    let userObj = await Users.findAll({
      where: {
        user_level: {
          [Op.ne]: "Super Admin"
        },
      },
      include: newAssoc,
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "List of users",
      usersResource.transformCollection(userObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let userObj = await Users.findOne({ where: { id: id } });
    if (!userObj) {
      return response(NOT_FOUND, "User not found", userObj);
    }
    userObj = await Users.destroy({
      where: {
        id: id,
      },
    });
    return response(OK, "User deleted", userObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
