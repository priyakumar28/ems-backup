const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const {
  models: { employees: Employees, department: Department, settings: Settings },
  models,
} = require("../../models");
const EmployeeDataHistory = require("../../services/employees/employeedatahistory");
const Users = require("../../services/user/users");
const employeeResource = require("../../resources/employees");
const settingsResourse = require("../../resources/settings");
const { bulkCreate: bulkCreateSchema } = require("../../validations/employees");
const requireAuth = require("../../middlewares/_requireAuth");
const { Op } = require("sequelize");
const { EmpDHC } = require("../../helpers");
const { eh } = require("../../config/emphistory");
const { module_helpers } = require("../../config/module_helpers");
const EmployeeEventEmitter = require("../../events/employee/basic");
const { getHostURL } = require("../../controllers/employees");

let moduleCategory = {};
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;
moduleCategory.VIEW_USERS = module_helpers["User management"].VIEW_USERS;
moduleCategory.ASSIGN_ROLES =
  module_helpers["Employee management"].ASSIGN_ROLES;
moduleCategory.VIEW_TRAINING_SESSIONS =
  module_helpers["Training sessions management"].VIEW_TRAINING_SESSIONS;

let usersAssoc = {
  model: models.users,
  as: "users",
};

let userRolesAssoc = [
  {
    model: models.userroles,
    as: "users_userroles",
    include: [
      {
        model: models.modules,
        as: "userroles_modules",
      },
    ],
  },
];

let etsAssoc = {
  model: models.employeetrainingsessions,
  as: "employeetrainingsessions",
};

let tsAssoc = [
  {
    model: models.trainingsessions,
    as: "trainingsession_trainingsession",
  },
];

let associations = [
  "employment_status_employmentstatus",
  "job_title_jobtitle",
  "supervisor_employee",
  "department_department",
  "designation_designation",
  "emergencycontacts",
  "bankdetails",
  "employee_employmenthistory",
  "employeeeducations",
  "employeedocuments",
  "employeeskills",
  "nomineedetails",
];

let modp = [
  "a",
  "a",
  "a",
  "a",
  "a",
  "View emergency contacts",
  "View bank details",
  "View employment history",
  "View educations",
  "View documents",
  "View skills & certifications",
  "View nominee details",
];

let newAssoc = [];
exports.getById = async (id, permission, ussr) => {
  for (let i = 0; i < modp.length; i++) {
    if (modp[i] == "a") {
      newAssoc.push(associations[i]);
    } else {
      if (permission[modp[i]]) {
        newAssoc.push(associations[i]);
      }
    }
  }

  if (permission[moduleCategory.VIEW_USERS]) {
    if (permission[moduleCategory.VIEW_ROLES]) {
      usersAssoc["include"] = userRolesAssoc;
    }
    newAssoc.push(usersAssoc);
  }

  if (permission[moduleCategory.VIEW_TRAINING_SESSIONS]) {
    etsAssoc["include"] = tsAssoc;
    newAssoc.push(etsAssoc);
  }
  try {
    let employeeObj = await Employees.findOne({
      where: { id: id },
      include: newAssoc,
      order: [["id", "DESC"]],
    });
    if (!employeeObj) {
      return response(BAD_REQUEST, "data with given id not found");
    }
    employeeObj = employeeResource.transform(employeeObj);
    return response(OK, "Employee retrieved", employeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.getByIsReportingManager = async (isReportingManager) => {
  try {
    let employeeObj = await Employees.findAll({
      where: { is_reporting_manager: isReportingManager },
      // include: associations,
      order: [["id", "DESC"]],
    });
    return response(OK, "employees (Reporting Managers) list ", employeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload, permission, usrr) => {
  const roler = payload?.selectedRoles?.map((x) => x.value);

  try {
    if (roler) {
      if (!permission[moduleCategory.ASSIGN_ROLES]) {
        return response(UNAUTHORIZED, "You are not authorized to assign roles");
      }
    }
    let user_payload, emp;
    let employeeObj = await Employees.findOne({
      where: { work_email: payload.work_email },
    });

    if (employeeObj) {
      return response(BAD_REQUEST, "Employee is already registered.");
    } else {
      employeeObj = await Employees.findOne({
        order: [["employee_id", "DESC"]],
      });
      if (employeeObj) {
        payload["employee_id"] = (
          parseInt(employeeObj.employee_id) + parseInt(1)
        ).toString();
      } else {
        payload["employee_id"] = "200001"; //concurrency problem
      }
      // payload.department = payload.department ? payload.department : null;
      // payload.designation = payload.designation ? payload.designation : null;
      payload.supervisor = payload.supervisor ? payload.supervisor : null; // l-152 to l-154 unwanted lines

      /**Sanjeev Gunasekaran: From employees create, This object is to check if the Configuration settings to enable email sending is true or false */
      let MAILSET = settingsResourse.transform(
        await Settings.findOne({ where: { name: "change" } })
      );

      employeeObj = await Employees.create(payload); // what if more people //'lely call the service
      //set a db transaction explicitly
      try {
        user_payload = {
          email: employeeObj.work_email,
          employee: employeeObj.id,
          profile_pic: employeeObj.profile_pic, // profile pic has no need in role condition
        };
        if (roler) {
          user_payload["user_roles"] = roler;
        }
        await Users.create(user_payload);
        emp = await this.getById(employeeObj.dataValues.id, permission);
        eh("create", usrr, EmpDHC.emp_create, emp); ///code review 18-7-2022
        emp = emp.data;
        return response(OK, "New  Employee and User created", {
          emp,
          MAILSET,
        });
      } catch (error) {
        return response(
          OK,
          "employee is created but user is not created",
          error.message
        );
      }
    }
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.bulkCreate = async (payload, errors1, initialCount) => {
  let work_emails = payload.map((x) => x.work_email);
  let employee_ids = payload.map((x) => x.employee_id);
  let existingEmployees = await Employees.findAll({
    where: {
      [Op.or]: [
        {
          employee_id: {
            [Op.in]: employee_ids,
          },
        },
        {
          work_email: {
            [Op.in]: work_emails,
          },
        },
      ],
    },
  });

  if (existingEmployees.length > 0) {
    existingEmployees.map((x) => {
      //  errors1.push({ message: `employee with id ${x.employee_id} or email ${x.work_email} is already exists` })
      errors1.push({
        message: `${x.employee_id} - Employee Id ${x.employee_id} or email ${x.work_email} already exists`,
      });
    });
    let existed_employee_ids = existingEmployees.map((x) => x.employee_id);
    let existed_work_emails = existingEmployees.map((x) => x.work_email);

    const allowedEmployeesToCreate = payload.filter((object) => {
      return (
        !existed_employee_ids.includes(object.employee_id) &&
        !existed_work_emails.includes(object.work_email)
      );
    });

    payload = allowedEmployeesToCreate;
  }
  let insertedCount = payload.length;

  /**Sanjeev Gunasekaran: From employees bulkImport, This object is to check if the Configuration settings to enable email sending is true or false */
  let MAILSET = settingsResourse.transform(
    await Settings.findOne({ where: { name: "change" } })
  );

  let bulkemployeeObj = await Employees.bulkCreate(payload);

  //Sanjeev triggers the email!!!////
  for (let i in bulkemployeeObj) {
    EmployeeEventEmitter.emit(
      "employee_bulk_created",
      employeeResource.transform(bulkemployeeObj[i]),
      MAILSET.value
    );
  }

  try {
    const payload1 = bulkemployeeObj.map((x) => {
      return {
        email: x.work_email,
        employee: x.id,
      };
    });
    await Users.bulkCreate(payload1);
    // let message_code = errors1.length > 0 ? ''
    try {
      if (insertedCount == initialCount) {
        // all_records_are_created
        return response(OK, "all_records_are_created", bulkemployeeObj);
      } else if (insertedCount == 0) {
        // no_records_are_created
        return response(OK, "no_records_are_created", errors1);
      } else if (insertedCount < initialCount) {
        // partial_records_are_created
        //return response(OK, `${-(parseInt(insertedCount) - parseInt(initialCount))} records in excel file are Failed`, errors1);
        return response(OK, "partial_records_are_created", errors1);
      }
    } catch (e) { }

    // return response(OK, "Successfully imported the employee and user records from the excel file", errors1);
  } catch (err) {
    return response(
      OK,
      "employee created but user is not created",
      err.message
    );
  }
};

exports.update = async (payload, id, permission, usrr) => {
  let employeeObj, employeeObj2;
  try {
    associations.push({
      model: models.users,
      as: "users",
      include: [
        {
          model: models.userroles,
          as: "users_userroles",
        },
      ],
    });
    employeeObj = await Employees.findOne({
      where: { id: id },
      include: associations,
    });
    if (!employeeObj) {
      return response(NOT_FOUND, "req employee not found", employeeObj);
    }
    try {
      if (
        payload.hasOwnProperty("selectedRoles") &&
        typeof payload.selectedRoles == "object" &&
        payload.selectedRoles != null
      ) {
        const roler = payload.selectedRoles.map((x) => x.value);
        if (roler) {
          if (!permission[moduleCategory.ASSIGN_ROLES]) {
            return response(UNAUTHORIZED, "You are not authorized");
          }
          let userPayload = { role_update: roler };
          if (employeeObj?.users?.id) {
            await Users.update(
              userPayload,
              employeeObj.users.id,
              "role_update"
            );
          }
          // else {
          //   return response(NOT_FOUND,"no relation between user and employee")
          // }
        }
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
    payload.private_email = payload.private_email
      ? payload.private_email
      : null;
    await Employees.update(payload, { where: { id } });

    employeeObj2 = await Employees.findOne({
      where: { id: id },
      include: associations,
      // {
      //   model: models.users,
      //   as: "users",
      //   include: [
      //     {
      //       model: models.userroles,
      //       as: "users_userroles",
      //     },
      //   ],
      // }
      // ],
    });

    eh("update", usrr, EmpDHC.emp_update, employeeObj, employeeObj2);
    employeeObj2 = await this.getById(employeeObj.dataValues.id, permission);
    employeeObj = employeeResource.transform(employeeObj);

    let finalrecord = employeeObj2.data;

    if (payload.selectedRoles) {
      EmployeeEventEmitter.emit("userroles_updated", employeeObj, finalrecord);
    }
    // console.log("Inside update Service");
    // console.log("before update: ", employeeObj.status, employeeObj.designation);
    // console.log(
    //   "after update: ",
    //   employeeObj2.data.status,
    //   employeeObj2.data.designation
    // );
    let msg = "Employee updated successfully";
    if (payload.status) msg = "Status chnaged succesfully"

    return response(OK, msg, {
      employeeObj,
      finalrecord,
    });
  } catch (error) {
    console.log(error);
    // eh("update_failed", usrr, EmpDHC.emp_update, employeeObj, employeeObj2);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (whereObj = null) => {
  try {
    let options = {
      include: ["department_department", "designation_designation"],
      order: [["id", "DESC"]],
    };
    if (whereObj) {
      options["where"] = whereObj;
    }

    let employeeObj = await Employees.findAll(options);
    employeeObj = employeeResource.transformCollection(employeeObj);
    return response(OK, "employees list", employeeObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, usrr) => {
  let emp;
  try {
    emp = await this.getById(id, usrr);
    let employeeObj = await Employees.destroy({ where: { id: id } });
    eh("delete", usrr, EmpDHC.emp_delete, emp);
    return response(OK, "employee deleted", employeeObj);
  } catch (error) {
    // eh("delete_failed", usrr, EmpDHC.emp_delete, emp);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
