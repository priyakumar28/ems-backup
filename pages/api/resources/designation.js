const departmentResource = require("./department");

module.exports = {
  transform(designation) {
    // console.log("de",designation,designation["data"]);
    return {
      id: designation.id,
      name: designation.name,
      code: designation.code,
      department: designation.department_department
        ? departmentResource.transform(designation.department_department)
        : {},
      description: designation.description,
      status: designation.status,
    };
  },

  transformCollection(designations) {
    designations = typeof designations === "object" ? designations : [];
    var data = [];
    for (var i = 0; i < designations?.length; i++) {
      data.push(this.transform(designations[i]));
    }
    return data;
  },
};
