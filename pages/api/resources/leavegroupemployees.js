const employeesResource = require("./employees");

module.exports = {
  transform(LGREMP) {
    if (LGREMP && typeof LGREMP === "object") {
      return {
        id: LGREMP.id,
        employee: employeesResource.transformCollection(
          LGREMP.employee_employee
        ),
        leave_group: leavegroupResource.transformCollection(
          LGREMP.leave_group_leavegroup
        ),
        created: LGREMP.created,
        updated: LGREMP.updated,
      };
    }
    return {};
  },

  transformCollection(LGREMPS) {
    LGREMPS = typeof LGREMPS === "object" ? LGREMPS : [];
    let data = [];

    for (let i in LGREMPS) {
      data.push(this.transform(LGREMPS[i]));
    }
    return data;
  },
};
