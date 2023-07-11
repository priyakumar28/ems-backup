const ac = async (roles, mod_names, loggedUserEmail) => {
  const { getbyUserLevel } = require("../controllers/users/[type]");
  let { data } = await getbyUserLevel();
  let superAdmins = data;
  let userModules = [];
  let permissionsForModules = {};
  roles = typeof roles == "object" && roles.length > 0 ? roles : [];
  let rr = roles.map((role) => role.modules.map((modules) => modules.name));
  rr.forEach((e) => e.forEach((a) => userModules.push(a)));
  mod_names.map((module_name) => {
    permissionsForModules[module_name] =
      userModules.includes(module_name) ||
      superAdmins.includes(loggedUserEmail);
  });
  return permissionsForModules;
};

module.exports = {
  ac,
};