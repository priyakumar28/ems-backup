const employeesResource = require("./employees");
const languagesResource = require("./languages");
module.exports = {
  transform(EMPLANG) {
    if (EMPLANG && typeof EMPLANG === "object") {
      return {
        id: EMPLANG.id,
        employee: employeesResource.transformCollection(
          EMPLANG.employee_employee
        ),
        language_id: languagesResource.transformCollection(EMPLANG.language),
        feedback: EMPLANG.feedback,
        status: EMPLANG.status,
        proof: EMPLANG.proof,
      };
    }
    return {};
  },

  transformCollection(EMPLANGS) {
    EMPLANGS = typeof EMPLANGS === "object" ? EMPLANGS : [];
    let data = [];
    for (let i in EMPLANGS) {
      data.push(this.transform(EMPLANGS[i]));
    }
    return data;
  },
};
