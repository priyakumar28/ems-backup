const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const { basic } = require("../../services/employees");
const {
  getById: getEmployeeSchema,
  create: createEmployeeSchema,
  update: updateEmployeeSchema,
  delete: deleteEmployeeSchema,
} = require("../../validations/employees");
const { response } = require("../../helpers");
const requireAuth = require("../../middlewares/_requireAuth");
const { ac } = require("../../middlewares/accesscontrol");
const { module_helpers } = require("../../config/module_helpers");
const EmployeeEventEmitter = require("../../events/employee/basic");
const employeeResource = require("../../resources/employees");
let HOSTURL;
let moduleCategory = module_helpers["Employee management"];
moduleCategory.VIEW_ROLES = module_helpers["Roles management"].VIEW_ROLES;
moduleCategory.VIEW_USERS = module_helpers["User management"].VIEW_USERS;
moduleCategory.ASSIGN_USER_ROLES =
  module_helpers["User management"].ASSIGN_USER_ROLES;
moduleCategory.VIEW_TRAINING_SESSIONS =
  module_helpers["Training sessions management"].VIEW_TRAINING_SESSIONS;
let permission, modules;
export default requireAuth(async (req, res) => {
  const {
    query: { id, isReportingManager },
    method,
    user,
  } = req;
  HOSTURL = req.headers.referer.slice(0, 22);

  modules = Object.values(moduleCategory);
  permission = await ac(user.roles, modules, user.email);
  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (permission[moduleCategory.VIEW_EMPLOYEES]) {
        if (id) {
          result = await getById(req.query.id, permission, user);
        } else if (isReportingManager) {
          result = await getByIsReportingManager(req.query.isReportingManager);
        } else {
          let whereObj = null;
          if (req.query.departmentId) {
            whereObj = {
              department: req.query.departmentId,
              status: req.query.status,
              is_reporting_manager: req.query.is_reporting_manager,
            };
          }
          result = await list(whereObj);
        }
      }
      break;
    case "POST":
      if (permission[moduleCategory.CREATE_EMPLOYEES]) {
        let payload = {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          work_phone: req.body.work_phone,
          work_email: req.body.work_email,
          private_email: req.body.private_email,
          designation: req.body.designation,
          department: req.body.department,
          status: req.body.status,
          gender: req.body.gender,
          birthday: req.body.birthday,
          marital_status: req.body.marital_status,
          blood_group: req.body.blood_group,
          native_state:
            req.body.native_state?.trim() == ""
              ? null
              : req.body.native_state?.trim(),
          height: req.body.height,
          weight: req.body.weight,
          religion: req.body.religion,
          nationality: req.body.nationality,
          aadhar_number: req.body.aadhar_number?.split(" ").join(""),
          pan_number:
            req.body.pan_number?.trim() == ""
              ? null
              : req.body.pan_number?.trim(),
          // passport_num:
          //   req.body.passport_num?.trim() == ""
          //     ? null
          //     : req.body.passport_num?.trim(),
          address1: req.body.address1,
          address2:
            req.body.address2?.trim() == "" ? null : req.body.address2?.trim(),
          city: req.body.city,
          country: req.body.country === "India" ? "IN" : req.body.country,
          state: req.body.state,
          zipcode: req.body.zipcode,
          pre_address1: req.body.pre_address1,
          pre_address2:
            req.body.pre_address2?.trim() == ""
              ? null
              : req.body.pre_address2?.trim(),
          pre_city: req.body.pre_city,
          pre_country:
            req.body.pre_country === "India" ? "IN" : req.body.pre_country,
          pre_state: req.body.pre_state,
          pre_zipcode: req.body.pre_zipcode,
          present_and_permanent_addres_same:
            req.body.present_and_permanent_addres_same,
          joined_date:
            req.body.joined_date?.trim() == ""
              ? null
              : req.body.joined_date?.trim(),
          supervisor: req.body.supervisor,
          //   department:
          //     req.body.department?.trim() == ""
          //       ? null
          //       : req.body.department?.trim(),
          //   designation:
          //     req.body.designation?.trim() == ""
          //       ? null
          //       : req.body.designation?.trim(),
          //   height:
          //     req.body.height?.trim() == "" ? null : req.body.height?.trim(),
          //   weight:
          //     req.body.weight?.trim() == "" ? null : req.body.weight?.trim(),
          is_reporting_manager: req.body.is_reporting_manager,
        };
        result = await create(
          payload,
          req.body.selectedRoles,
          permission,
          user
        );
      }
      break;
    case "PUT":

      if (
        permission[moduleCategory.UPDATE_EMPLOYEES] ||
        user.employee.id == req.query.id
      ) {
        let payload = {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          work_phone: req.body.work_phone,
          work_email: req.body.work_email,
          private_email: req.body.private_email,
          designation: req.body.designation,
          department: req.body.department,
          status: req.body.status,
          gender: req.body.gender,
          birthday: req.body.birthday,
          marital_status: req.body.marital_status,
          blood_group: req.body.blood_group,
          native_state:
            req.body.native_state?.trim() == ""
              ? null
              : req.body.native_state?.trim(),
          height: req.body.height,
          weight: req.body.weight,
          religion: req.body.religion,
          nationality: req.body.nationality,
          aadhar_number: req.body.aadhar_number?.split(" ").join(""),
          pan_number:
            req.body.pan_number?.trim() == ""
              ? null
              : req.body.pan_number?.trim(),
          // passport_num:
          //   req.body.passport_num?.trim() == ""
          //     ? null
          //     : req.body.passport_num?.trim(),
          address1: req.body.address1,
          address2:
            req.body.address2?.trim() == "" ? null : req.body.address2?.trim(),
          city: req.body.city,
          country: req.body.country === "India" ? "IN" : req.body.country,
          state: req.body.state,
          zipcode: req.body.zipcode,
          pre_address1: req.body.pre_address1,
          pre_address2:
            req.body.pre_address2?.trim() == ""
              ? null
              : req.body.pre_address2?.trim(),
          pre_city: req.body.pre_city,
          pre_country:
            req.body.pre_country === "India" ? "IN" : req.body.pre_country,
          pre_state: req.body.pre_state,
          pre_zipcode: req.body.pre_zipcode,
          present_and_permanent_addres_same:
            req.body.present_and_permanent_addres_same,
          joined_date:
            req.body.joined_date?.trim() == ""
              ? null
              : req.body.joined_date?.trim(),
          supervisor: req.body.supervisor,
          //   department:
          //     req.body.department?.trim() == ""
          //       ? null
          //       : req.body.department?.trim(),
          //   designation:
          //     req.body.designation?.trim() == ""
          //       ? null
          //       : req.body.designation?.trim(),
          //   height:
          //     req.body.height?.trim() == "" ? null : req.body.height?.trim(),
          //   weight:
          //     req.body.weight?.trim() == "" ? null : req.body.weight?.trim(),
          is_reporting_manager: req.body.is_reporting_manager,
          long_absence_from: req.body.long_absence_from,
          reason: req.body.reason,
          long_absence_to: req.body.long_absence_to,
          terminated_on: req.body.terminated_on,
          resigned_on: req.body.resigned_on,
          last_working_day: req.body.last_working_day,
          probation_completion_date: req.body.probation_completion_date
        };
        result = await update(
          permission,
          payload,
          req.body.selectedRoles,
          req.body.reason,
          req.query.id,
          user
        );
      }
      break;
    case "DELETE":
      if (permission[moduleCategory.DELETE_EMPLOYEES]) {
        result = await remove(user, req.query.id);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});
/**
 * Get all employees and send as response.
 * @public
 */
export const getById = async (id, perm, ussr) => {
  try {
    const { error } = getEmployeeSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.getById(id, perm, ussr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
export const getByIsReportingManager = async (isReportingManager) => {
  try {
    return await basic.getByIsReportingManager(isReportingManager);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Create new employee
 * @public
 */
export const create = async (payload, selectedRoles, perm, usrr) => {
  try {
    const { error } = createEmployeeSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    // Create new employee by calling the employee services
    payload.selectedRoles = selectedRoles;
    let create_employee = await basic.create(payload, perm, usrr);
    if (create_employee.code === OK) {
      /**Sanjeev 200089 Dispatching the create employee 'welcome_email' event @public*/
      EmployeeEventEmitter.emit(
        "employee_created",
        employeeResource.transform(create_employee.data.employeeObj),
        HOSTURL,
        create_employee.data.MAILSET.value
      );
    }
    create_employee["data"] = create_employee.data.emp;
    return create_employee;
  } catch (error) {
    // return response with status code
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Update existing employee
 * @public
 */
export const update = async (
  perm,
  payload,
  selectedRoles,
  reason,
  id,
  usrr
) => {
  try {
    if (!payload.status) {
      delete payload.selectedRoles;
      delete payload.long_absence_from;
      delete payload.long_absence_to;
      delete payload.resigned_on;
      delete payload.terminated_on;
      delete payload.last_working_day;
      delete payload.probation_completion_date;
      delete payload.reason;
      const { error } = updateEmployeeSchema.body.validate(payload);
      if (error) {
        const { details } = error;
        const message = details
          .map((i) => i.message.replace(/\"/g, ""))
          .join(",");
        return response(UNPROCESSABLE_ENTITY, message);
      }
      if (typeof selectedRoles == "object") {
        payload["selectedRoles"] = selectedRoles;
      }
      if (payload.aadhar_number.includes("*")) {
        delete payload.aadhar_number;
      }
      delete payload.work_email;
    } else {
      let status, long_absence_from, long_absence_to, resigned_on, terminated_on, last_working_day, probation_completion_date;
      if (payload.status) {
        status = payload.status;
        long_absence_from = payload?.long_absence_from;
        long_absence_to = payload?.long_absence_to;
        resigned_on = payload?.resigned_on;
        terminated_on = payload?.terminated_on;
        last_working_day = payload?.last_working_day
        probation_completion_date = payload?.probation_completion_date
        for (const item in payload) {
          delete payload[item];
        }
        payload["status"] = status;
        payload["reason"] = reason;
        long_absence_from ? payload["long_absence_from"] = long_absence_from : null;
        long_absence_to ? payload["long_absence_to"] = long_absence_to : null;
        resigned_on ? payload["resigned_on"] = resigned_on : null;
        terminated_on ? payload["terminated_on"] = terminated_on : null;
        last_working_day ? payload["last_working_day"] = last_working_day : null;
        probation_completion_date ? payload["probation_completion_date"] = probation_completion_date : null;
      }
    }
    let update_employee = await basic.update(payload, id, perm, usrr);
    // code, message, transformed data
    if (update_employee.code == OK) {
      /**Sanjeev 200089 @puclic */
      EmployeeEventEmitter.emit(
        "employee_record_update",
        update_employee.data.employeeObj,
        update_employee.data.finalrecord,
        HOSTURL
      );
    }
    update_employee["data"] = update_employee.data.finalrecord;
    return update_employee;
  } catch (error) {
    console.log(error);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Get employee list
 * @public
 */
export const list = async (whereObj) => {
  try {
    return await basic.list(whereObj);
  } catch (error) {
    console.log(error, "from emp list controller");
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
/**
 * Delete employee
 * @public
 */
export const remove = async (usrr, id) => {
  try {
    const { error } = deleteEmployeeSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await basic.remove(id, usrr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
