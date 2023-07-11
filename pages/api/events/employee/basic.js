const { sendMail } = require("../../services/emailservice");
const employeeResource = require("../../resources/employees");
const { generateMailContent, response } = require("../../helpers");
const EmployeeEventEmitter = require("../index");
/**Sanjeev 200089 : Subscribe for employee_created event @public*/

EmployeeEventEmitter.on("employee_created", async (data, HOSTURL, setting) => {
  try {
    console.log("Inside create employee email trigger event: ", data);
    if (setting == "true") {
      let employeeObj = {
        email: data.work_email,
        subject: "Welcome to BAssure family",
        mailContent: generateMailContent("welcome_employee.js", {
          employee_name: data.first_name,
          email: data.work_email,
          host_url: HOSTURL,
        }),
      };

      return await sendMail(employeeObj);
    } else {
    }
  } catch (err) {
    console.log(`Email not sent to ${data.work_email}`, err);
  }
});

EmployeeEventEmitter.on("employee_bulk_created", async (data, setting) => {
  try {
    if (setting == "true") {
      let employeeObj = {
        email: data.work_email,
        subject: "Welcome to BAssure family",
        mailContent: generateMailContent("welcome_employee.js", {
          employee_name: data.first_name,
          email: data.work_email,
        }),
      };

      await sendMail(employeeObj);
    } else {
    }
  } catch (err) {
    console.log(`Email not sent to ${data.work_email}`, err);
  }
});

EmployeeEventEmitter.on(
  "employee_record_update",
  async (data, finalrecord, HOSTURL) => {
    try {
      /**Existing record designation @public */
      let PREVIOUS_DESIGNATION = data.designation.id;
      /**Payload record designation @public */
      let LATEST_DESIGNATION = finalrecord.designation.id;
      /**Existing record employee status @public */
      let PREVIOUS_EMPLOYEE_STATUS = data.status;
      /**Payload record employee status @public */
      let LATEST_EMPLOYEE_STATUS = finalrecord.status;
      let employeeObj;
      let date = new Date();
      if (
        PREVIOUS_DESIGNATION !== LATEST_DESIGNATION ||
        (PREVIOUS_DESIGNATION == LATEST_DESIGNATION) == undefined
      ) {
        /**employee designation change*/
        employeeObj = {
          email: finalrecord.work_email,
          subject: `Your designation is changed to ${finalrecord.designation.name}`,
          mailContent: generateMailContent("employee_designation_change.js", {
            host_url: HOSTURL.slice(0, 21).trim(),
            employee_name: finalrecord.first_name,
            previous_employee_post: data.designation.name,
            new_employee_post: finalrecord.designation.name,
            effective_date: date.toUTCString().slice(0, 17).trim(),
            email: finalrecord.work_email,
          }),
        };
      } else if (
        PREVIOUS_EMPLOYEE_STATUS !== LATEST_EMPLOYEE_STATUS ||
        !LATEST_EMPLOYEE_STATUS
      ) {
        /**employee status change*/
        employeeObj = {
          email: finalrecord.work_email,
          subject: `You status is changed to '${finalrecord.status}'`,
          mailContent: generateMailContent("employee_status_change.js", {
            employee_name: finalrecord.first_name,
            previous_employee_status: PREVIOUS_EMPLOYEE_STATUS,
            new_employee_status: LATEST_EMPLOYEE_STATUS, //tobe fixed
          }),
        };
      }
      // check if employeeObj is an object
      if (typeof employeeObj === "object") {
        await sendMail(employeeObj);
      } else {
        console.log("employeeObj is empty", HOSTURL.slice(0, 21));
      }
    } catch (error) {
      console.log(`Email not sent to ${finalrecord.work_email}`);
    }
  }
);

EmployeeEventEmitter.on("bankdetails_updated", async (data) => {
  try {
    let employeeObj = {
      email: data.work_email,
      subject: "Hi,your bank details have been updated",
      mailContent: generateMailContent("bankdetails_change.js", {
        employee_name: data.first_name,
      }),
    };
    await sendMail(employeeObj);
  } catch (err) {
    console.log(`Email not sent to ${data.work_email}`, err);
  }
});

EmployeeEventEmitter.on("send_bank_details_to_email", async (data) => {
  try {
    let employeeObj = {
      email: data.work_email,
      subject: `Hi, bank details for employee - ${data.employee_code}`,
      mailContent: generateMailContent("bankdetails.js", {
        employee_code: data.employee_code,
        employee_email: data.employee_email,
        employee_name: data.employee_name,
        account_status: data.account_status,
        account_type: data.account_type,
        ifsc: data.ifsc,
        branch: data.branch,
        bank_name: data.bank_name,
        account_number: data.account_number,
        reason_for_rejection: data.reason_for_rejection
      }),
      attachments: data.attachments
    };
    await sendMail(employeeObj);
  } catch (err) {
    console.log(`Email not sent to ${data.work_email}`, err);
  }
});

EmployeeEventEmitter.on("userroles_assigned", async (data) => {
  try {
    let a = data.user.roles.map((x) => x.name);
    a = a.join();
    let employeeObj = {
      email: data.work_email,
      subject: "Roles Assigned",
      mailContent: generateMailContent("role_assign.js", {
        employee_name: data.first_name,
        roles: a,
      }),
    };
    await sendMail(employeeObj);
  } catch (err) {}
});
EmployeeEventEmitter.on("userroles_updated", async (initial, final) => {
  try {
    let employeeObj;

    /**To get the initial array of roles */
    let a = initial.user.roles.map((x) => x.name).sort();
    /**Toget the updated array of roles */
    let b = final.user.roles.map((x) => x.name).sort();

    /**To check the index of the arrays */
    let A = parseInt(a.length);
    /**To check the index of the arrays */
    let B = parseInt(b.length);

    /**Unique values in both the arrays will be pushed into this empty array*/
    let newArr = [];
    /**unique method in the ../../lib/helpers.js */
    let unike = unique(a, b, newArr).flat();

    /**To set mail content according to the following conditions*/
    let content;
    if (unike === []) {
      console.log("No need to send email");
    } else if (A < B) {
      content = generateMailContent("role_update_add.js", {
        employee_name: final.first_name,
        roles: unike,
        new_roles: a.flat(),
      });
    } else if (A > B) {
      content = generateMailContent("role_update_delete.js", {
        employee_name: final.first_name,
        roles: unike,
      });
    }
    employeeObj = {
      email: final.work_email,
      subject: "Role update",
      mailContent: content,
    };
    if (typeof employeeObj === "object") {
      await sendMail(employeeObj);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = EmployeeEventEmitter;
