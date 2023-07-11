const employeeresources = require("./employees");

module.exports = {
  //single transformation
  transform(e) {
    if (e && typeof e === "object") {
      return {
        id: e.id,
        employee: employeeresources.transform(e.employee_employee),
        date_start: e.date_start,
        date_end: e.date_end,
        status: e.status,
        comments: e.comments,
      };
    }
    return {};
  },
  //
  transformCollection(es) {
    es = typeof es === "object" ? es : [];
    let data = [];
    for (let i in es) {
      data.push(this.transform(es[i]));
    }
    return data;
  },
};
