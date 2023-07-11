const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../../config/status_codes');
const { models: {
    userroles: Userroles,
    permissions: Permissions,
    modules: Modules,
    employees: Employees
} } = require('../../models');
const userrolesResource = require('../../resources/userroles');
const Perm = require('../../services/permissions/permissions');
const Mod = require('../../services/user/modules');
const { module_helpers } = require('../../config/module_helpers');


let moduleCategory = module_helpers["Roles management"];

function getAllFuncs(toCheck) {
  const props = [];
  let obj = toCheck;
  do {
    props.push(...Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter((e, i, arr) => {
    if (e != arr[i + 1] && typeof toCheck[e] == "function") return true;
  });
}

exports.getById = async (id) => {
  try {
    let userroleObj = await Userroles.findOne({
      where: { id: id },
      include: [
        "userroles_assignmodules",
        {
          model: Modules,
          as: "userroles_modules",
          include: [
            {
              model: Permissions,
              as: "modules_permissions",
            },
          ],
        },
      ],
    });

    if (!userroleObj) {
      return response(NOT_FOUND, "req userrole not found", userroleObj);
    }
    return response(OK, "userDetail", userrolesResource.transform(userroleObj));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.createOrUpdate = async ({ name, modules, mod_arr, id }, permission) => {
  try {
    let userroleObj;
    if (id) {
      userroleObj = await Userroles.findOne({
        where: { id },
        include: [
          {
            model: Modules,
            as: "userroles_modules",
            include: [
              {
                model: Permissions,
                as: "modules_permissions",
              },
            ],
          },
          "userroles_assignmodules",
        ],
      });
      userroleObj.name = name;
      await userroleObj.save();
      if (mod_arr) {
        if (permission[moduleCategory.UPDATE_ROLES]) {
          let moduleDup2 = userroleObj.userroles_assignmodules.map((x) => x.id);
          let spareArr = [];
          if (typeof mod_arr == "object" && mod_arr?.length > 0) {
            if (moduleDup2) {
              moduleDup2.forEach((element) => {
                if (!mod_arr.includes(element)) {
                  spareArr.push(element);
                }
              });
              if (spareArr.length > 0) {
                await userroleObj.removeUserroles_modules(spareArr);
              }
            }
            await userroleObj.setUserroles_assignmodules(mod_arr);
          } else if (mod_arr?.length == 0) {
            await userroleObj.setUserroles_assignmodules([]);
            await userroleObj.setUserroles_modules([]);
          }
        } else {
          return response(UNAUTHORIZED, "you are not authorized");
        }
      } else if (modules) {
        if (permission[moduleCategory.SET_PERMISSIONS_FOR_ROLES]) {
          // let moduleDup = userroleObj.userroles_modules.map((x) => x.id);
          if (typeof modules == "object" && modules?.length > 0) {
            await userroleObj.setUserroles_modules(modules);
          } else if (modules.length == 0) {
            await userroleObj.setUserroles_modules([]);
          }
        } else {
          return response(UNAUTHORIZED, "you are not authorized");
        }
      }
    } else {
      if (permission[moduleCategory.CREATE_ROLES]) {
        userroleObj = await Userroles.create({ name });
        if (mod_arr && typeof mod_arr == "object" && mod_arr?.length > 0) {
          await userroleObj.setUserroles_assignmodules(mod_arr);
        }
      } else {
        return response(UNAUTHORIZED, "you are not authorized");
      }
    }
    userroleObj = (await this.getById(userroleObj.id)).data;
    return response(OK, "Role saved", userroleObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let userroleObj = await Userroles.findAll({
      include: [
        {
          model: Modules,
          as: "userroles_modules",
          include: [
            {
              model: Permissions,
              as: "modules_permissions",
            },
          ],
        },
        "userroles_assignmodules",
      ],
      order: [["id", "DESC"]],
    });
    return response(
      OK,
      "list of Userroles",
      userrolesResource.transformCollection(userroleObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    let userroleObj = await Userroles.findOne({ where: { id } });
    if (!userroleObj) {
      return response(NOT_FOUND, "req userrole not found", userroleObj);
    }
    await Userroles.destroy({ where: { id: id } });
    await userroleObj.setUserroles_modules([]);
    await userroleObj.setUserroles_assignmodules([]);
    return response(
      OK,
      "Userrole record deleted",
      userrolesResource.transform(userroleObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
