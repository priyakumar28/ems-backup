const userrolesResource = require("./userroles");
const employeeResource = require("./employees");
const moment = require("moment");

module.exports = {
  // single transformation
  transform(user) {
    if (user && typeof user === "object") {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        user_level: user.user_level,
        last_login: user.last_login,
        last_update: user.last_update,
        lang: user.lang,
        created: user.created
          ? moment(user.created).format("DD-MMM-YYYY")
          : null,
        profile_pic: user.profile_pic,
        roles: user.users_userroles
          ? userrolesResource.transformCollection(user.users_userroles)
          : [],
        employee: user.employee_employee
          ? employeeResource.transform(user.employee_employee)
          : {},
      };
    }
    return {};
  },

  //
  transformCollection(users) {
    users = typeof users === "object" ? users : [];
    let data = [];
    for (const element of users) {
      data.push(this.transform(element));
    }
    return data;
  },
};
