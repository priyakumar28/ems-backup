const employeeResource = require("./employees");
const projectResource = require("./projects");
const roleResource = require("./userroles");
module.exports = {
  // single transformation
  transform(employeeproject) {
    if (employeeproject && typeof employeeproject === "object") {
      return {
        id: employeeproject.id,
        date_start: employeeproject.date_start,
        date_end: employeeproject.date_end,
        status: employeeproject.status,
        details: employeeproject.details,
        project: projectResource.transform(employeeproject.project_project),
        employee: employeeResource.transform(employeeproject.employee_employee),
        bill_type: employeeproject.bill_type,
        bill_percent: employeeproject.bill_percent,
        comments: employeeproject.comments,
        roles: employeeproject.employeeprojects_userroles
          ? roleResource.transformCollection(
              employeeproject.employeeprojects_userroles
            )
          : [],
      };
    }
    return {};
  },

  //
  transformCollection(employeeprojects) {
    employeeprojects =
      typeof employeeprojects === "object" ? employeeprojects : [];
    var data = [];
    for (var i = 0; i < employeeprojects?.length; i++) {
      data.push(this.transform(employeeprojects[i]));
    }
    return data;
  },
};
