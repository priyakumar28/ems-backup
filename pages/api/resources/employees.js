const emergencyContactsResource = require("./emergencycontacts");
const bankDetailsResource = require("./bankdetails");
const employeetrainingsessionsResource = require("./employeetrainingsessions");
const employmentHistoryResource = require("./employeeemploymenthistory");
const employeecertificationsResource = require("./employeecertifications");
const employeeeducationsResource = require("./employeeeducations");
const employeedocumentsResource = require("./employeedocumentstwo");
const employeeskillsResource = require("./employeeskills");
const nomineedetailsResource = require("./nomineedetails");
const usersResource = require("./userstwo");
const departmentResource = require("./department");
const designationResource = require("./designation")
const { maskCard, maskPassword } = require("maskdata");

module.exports = {
  // single transformation
  transform(employee) {
    if (employee && typeof employee === "object") {
      return {
        id: employee.id,
        employee_id: employee.employee_id,
        first_name: employee.first_name,
        middle_name: isEmpty(employee.middle_name) ? "" : employee.middle_name,
        last_name: isEmpty(employee.last_name) ? "" : employee.last_name,
        work_phone: employee.work_phone,
        work_email: employee.work_email,
        private_email: employee.private_email,
        gender: employee.gender,
        birthday: employee.birthday,
        marital_status: employee.marital_status,
        blood_group: employee.blood_group,
        status: employee.status,
        native_state: employee.native_state,
        religion: employee.religion,
        nationality: employee.nationality,
        aadhar_number: maskPassword(employee.aadhar_number),
        passport_num: maskCard(employee.passport_num),
        pan_number: maskCard(employee.pan_number),
        address1: employee.address1,
        address2: employee.address2,
        city: employee.city,
        country: employee.country,
        state: employee.state,
        zipcode: employee.zipcode,
        pre_address1: employee.pre_address1,
        pre_address2: employee.pre_address2,
        pre_city: employee.pre_city,
        pre_country: employee.pre_country,
        pre_state: employee.pre_state,
        pre_zipcode: employee.pre_zipcode,
        profile_pic: employee.profile_pic,
        joined_date: employee.joined_date,
        height: employee.height,
        weight: employee.weight,
        department: employee.department_department
          ? departmentResource.transform(employee.department_department)
          : [],
        designation: employee.designation_designation
          ? designationResource.transform(employee.designation_designation)
          : [],
        probation: employee.probation,
        reason: employee.reason,
        emergency_contacts: employee.emergencycontacts
          ? emergencyContactsResource.transformCollection(
            employee.emergencycontacts
          )
          : [],
        bank_details: employee.bankdetails
          ? bankDetailsResource.transformCollection(employee.bankdetails)
          : [],
        documents: employee.employeedocuments
          ? employeedocumentsResource.transformCollection(
            employee.employeedocuments
          )
          : [],
        employment_history: employee.employee_employmenthistory
          ? employmentHistoryResource.transformCollection(
            employee.employee_employmenthistory
          )
          : [],
        educations: employee.employeeeducations
          ? employeeeducationsResource.transformCollection(
            employee.employeeeducations
          )
          : [],
        skills: employee.employeeskills
          ? employeeskillsResource.transformCollection(employee.employeeskills)
          : [],
        certifications: employee.employeecertifications
          ? employeecertificationsResource.transformCollection(
            employee.employeecertifications
          )
          : [],
        training_sessions: employee.employeetrainingsessions
          ? employeetrainingsessionsResource.transformCollection(
            employee.employeetrainingsessions
          )
          : [],
        supervisor: employee.supervisor_employee,
        present_and_permanent_addres_same:
          employee.present_and_permanent_addres_same,
        nominee_details: employee.nomineedetails
          ? nomineedetailsResource.transformCollection(employee.nomineedetails)
          : [],
        user: employee.users ? usersResource.transform(employee.users) : [],
        // user:employee.users,
        // user: (typeof employee.users === 'object' && Object.entries(employee.users).length > 0) ? userResource.transform(employee.users) : {}
        is_reporting_manager: employee.is_reporting_manager,
        is_welcome_email_sent: employee.is_welcome_email_sent
      };

    }
  },

  //
  transformCollection(employees) {
    employees = typeof employees === "object" ? employees : [];
    var data = [];
    for (var i = 0; i < employees?.length; i++) {
      data.push(this.transform(employees[i]));
    }
    return data;
  },
};

function isEmpty(value) {
  return value == null || value.length === 0;
}
