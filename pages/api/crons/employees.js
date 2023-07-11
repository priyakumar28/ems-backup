// CRON functions to be run periodically

const {
  models: { employees: Employees, settings: Settings },
} = require("../models");
const { sendBulkMail } = require("../services/emailservice");
const { Op } = require("sequelize");
const { generateMailContent } = require("../helpers");

const pancardSubmitReminder = async (pan_number) => {
  try {
    let employees = await Employees.findAll({ where: pan_number == null });
    let max_days = await Settings.findOne({
      where: { name: "pancard_upload_max_days" },
    });
    //let b = employeeResource.transformCollection(a)
    let employeesArr = [];
    employees.map((employees) => {
      let lastDayToUpload = Math.round(
        (new Date().getTime() - new Date(employees.joined_date).getTime()) /
          (1000 * 3600 * 24)
      );
      let minDays = max_days.value - 5;
      let maxDays = max_days.value + 5;

      if (lastDayToUpload >= minDays && lastDayToUpload <= maxDays) {
        let remining_days = `${lastDayToUpload - minDays} days more to upload`;

        employeesArr.push({
          email: employees.work_email,
          subject: "Pancard update reminder alert",
          mailContent: generateMailContent("welcome.js", {
            employee_name: employees.first_name,
            remining_days: remining_days,
          }),
        });
      }
    });
    await sendBulkMail(employeesArr);
  } catch (error) {
  }
};

module.exports = {
  pancardSubmitReminder,
};
