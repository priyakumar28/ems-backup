const employeeleavesResource = require("./employeeleaves");

module.exports = {
  transform(EMPLD) {
    if (EMPLD && typeof EMPLD === "object") {
      return {
        id: EMPLD.id,
        employee_leave: employeeleavesResource.transformCollection(
          EMPLD.employee_leave_employeeleave
        ),
        leave_date: EMPLD.leave_date,
        leave_type: EMPLD.leave_type,
      };
    }
    return {};
  },

  transformCollection(EMPLDS) {
    EMPLDS = typeof EMPLDS === "object" ? users : [];
    let data = [];

    for (let i in EMPLDS) {
      data.push(this.transform(users[i]));
    }
    return data;
  },
};
