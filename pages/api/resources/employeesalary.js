const employeesResource = require("./employees");
module.exports = {
  transform(ES) {
    return {
      id: ES.id,
      employee: employeesResource.transformCollection(ES.employee_employee),
      compnent: ES.compnent,
      pay_frequency: ES.pay_frequency,
      currency: ES.currency,
      amount: ES.amount,
      details: ES.details,
    };
  },
  transformCollection(ESS) {
    ESS = typeof ESS === "object" ? ESS : [];
    let data = [];
    for (let i in ESS) {
      data.push(this.transform(ESS[i]));
    }
    return data;
  },
};
