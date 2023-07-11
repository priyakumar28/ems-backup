const { isValidURL } = require("../../../lib/helpers");
const MaskData = require("../../../node_modules/maskdata");
const { maskPhone, maskPassword } = require("../../../node_modules/maskdata");

module.exports = {
  //single transformation
  transform(employeeemploymenthistory) {
    if (
      employeeemploymenthistory &&
      typeof employeeemploymenthistory === "object"
    ) {
      return {
        id: employeeemploymenthistory.id,
        employer_name: employeeemploymenthistory.employer_name,
        date_start: employeeemploymenthistory.date_start,
        date_end: employeeemploymenthistory.date_end,
        job_title: employeeemploymenthistory.job_title,
        employment_type: employeeemploymenthistory.employment_type,
        payroll_type: employeeemploymenthistory.payroll_type,
        payroll_amount: maskPassword(employeeemploymenthistory.payroll_amount),
        reason_for_leaving: employeeemploymenthistory.reason_for_leaving,
        reference_name: employeeemploymenthistory.reference_name,
        reference_phno: employeeemploymenthistory.reference_phno,
        attachment: isValidURL(employeeemploymenthistory.attachment)
          ? employeeemploymenthistory.attachment
          : false,
      };
    }
    return {};
  },
  //
  transformCollection(employeeemploymenthistory) {
    employeeemploymenthistory =
      typeof employeeemploymenthistory === "object"
        ? employeeemploymenthistory
        : [];
    var data = [];
    for (var i = 0; i < employeeemploymenthistory.length; i++) {
      data.push(this.transform(employeeemploymenthistory[i]));
    }
    return data;
  },
};
