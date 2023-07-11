const { getWorkingHours, timeoverlap } = require("../../../../lib/helpers");
const {
  OK,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} = require("../../config/status_codes");
const {
  models: { employeetimeentry: EmployeeTimeEntry },
} = require("../../models");
const employeetimeentry_resource = require("../../resources/employeetimeentry");
const { EmpDHC, response } = require("../../helpers");

const { eh } = require("../../config/emphistory");

///Sanjeev Gunasekaran 200089////////////////////
exports.getById = async (id) => {
  try {
    // await Employees.findById(id)
    let employeetimeentryGetByIdObj = await EmployeeTimeEntry.findOne({
      include: [
        "project_project",
        "employee_employee",
        "timesheet_employeetimesheet",
      ],
      where: { id: id },
    });

    if (!employeetimeentryGetByIdObj) {
      return response(NOT_FOUND, "Employee Time Entry not found");
    }
    // Return EmployeeTimeEntry by his/her id by calling the EmployeeTimeEntry services
    else
      return response(
        OK,
        "EmployeeTimeEntry based on id",
        employeetimeentry_resource.eventTransform(employeetimeentryGetByIdObj)
      );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.getByProjectIdAndEmployeeId = async (projectId, employeeId) => {
 
  try {
    let employeetimeentryGetByIdObj = await EmployeeTimeEntry.findAll({
      include: [
        "project_project",
        "employee_employee",
        "timesheet_employeetimesheet",
      ],
      where: { project: projectId, employee: employeeId },
    });

    return response(
      OK,
      "EmployeeTimeEntry based on id",
      employeetimeentry_resource.eventTransformCollection(
        employeetimeentryGetByIdObj
      )
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload, usrr) => {
  try {

    ////////payload time_start and time_end/////////////////
    const ptstart = payload.time_start;
    const ptend = payload.time_end;

    /////////payload date_start and date_end/////////////////
    const pdstart = new Date(payload.date_start);
    const date_start1 = new Date(
      new Date(pdstart.setDate(pdstart.getDate())).toISOString().slice(0, 10)
    ); //// time eg. Fri Jul 02 2021 

    const working_hours_once = getWorkingHours(ptstart, ptend);

    const ARRAY = await EmployeeTimeEntry.findAll({
      where: { date_start: date_start1 },
    });
    ////play with this array////////////////////////
    const listneed = employeetimeentry_resource.transformCollection(ARRAY);
    ////play with this array////////////////////////

    let hours = listneed.map((x) => getWorkingHours(x.time_start, x.time_end));
    hours.push(working_hours_once);

    const Total_Day_Working_Hours = hours.reduce((x, y) => {
      return x + y;
    }, 0);

    let check = timeoverlap(listneed, payload);

    if (check) {
      return response(UNPROCESSABLE_ENTITY, "There is a time overlap");
    }
    if (Total_Day_Working_Hours > 8 || working_hours_once > 8) {
      return response(
        UNPROCESSABLE_ENTITY,
        `Working hours is more than 8 hrs, an employee need to rest!!`
      );
    } else if (Total_Day_Working_Hours <= 0 || working_hours_once <= 0) {
      return response(UNPROCESSABLE_ENTITY, `Invalid working hours!`);
    } else {
      let emptimeentryObj = await EmployeeTimeEntry.create(payload);
      let empteobj = await this.getById(emptimeentryObj.dataValues.id);

      eh("create", usrr, EmpDHC.timeentry_create, empteobj);
      return response(
        OK,
        "Time entry was successfully created",
        emptimeentryObj
      );
    }
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id, usrr) => {
  let empteobj, empteobj2;
  try {
    empteobj = await EmployeeTimeEntry.findOne({
      include: [
        "project_project",
        "employee_employee",
        "timesheet_employeetimesheet",
      ],
      where: { id: id },
    });
    const start = payload.time_start;
    const end = payload.time_end;
    const payload_date_start = payload.date_start;
    const working_hours_once = getWorkingHours(start, end);
    let date_start1 = new Date(payload_date_start).toISOString();
    let ARRAY = await EmployeeTimeEntry.findAll({
      where: { employee: payload.employee, date_start: date_start1 },
    });
    ARRAY = ARRAY.filter((x) => x.id != id);

    //The array to be played with///////////////////////////////////////
    let listneed = employeetimeentry_resource.transformCollection(ARRAY);

    //The array to be played with///////////////////////////////////////

    let check = timeoverlap(listneed, payload);
    let hours = listneed.map((x) => getWorkingHours(x.time_start, x.time_end));
    let index = hours.indexOf(getWorkingHours(start, end));

    if (index == -1) {
      hours.push(working_hours_once);
    } else {
      hours.splice(index, 1, working_hours_once);
      hours[index] = {
        time_start: start,
        time_end: end,
      };
    }

    let Total_Day_Working_Hours = hours.reduce((x, y) => {
      return x + y;
    }, 0);

    if (check) {
      return response(UNPROCESSABLE_ENTITY, `PUT: There is a time overlap`);
    } else if (Total_Day_Working_Hours > 8 || working_hours_once > 8) {
      return response(
        UNPROCESSABLE_ENTITY,
        `PUT: Employee needs to rest, more than 8 hrs work time`
      );
    } else if (Total_Day_Working_Hours <= 0 || working_hours_once <= 0) {
      return response(UNPROCESSABLE_ENTITY, `Invalid Working hours!!`);
    } else {
      let employeeupdateObj = await EmployeeTimeEntry.update(payload, {
        where: { id: id },
      });

      empteobj2 = await EmployeeTimeEntry.findOne({
        include: [
          "project_project",
          "employee_employee",
          "timesheet_employeetimesheet",
        ],
        where: { id: id },
      });
      eh("update", usrr, EmpDHC.timeentry_update, empteobj, empteobj2);
      return response(OK, `Time entry updated successfully`, employeeupdateObj);
    }
  } catch (error) {
    eh("update_failed", usrr, EmpDHC.timeentry_update, empteobj, empteobj2);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let employeetimeentrylistObj = await EmployeeTimeEntry.findAll({
      include: [
        "project_project",
        "employee_employee",
        "timesheet_employeetimesheet",
      ],
    });
    return response(
      OK,
      "list of EmployeeTimeEntry",
      employeetimeentry_resource.eventTransformCollection(
        employeetimeentrylistObj
      )
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, usrr) => {
  let empteobj;
  try {
    empteobj = await this.getById(id, usrr);
    // Educations.Destroy (is not exactly delete, like setting deleted flag)
    let employeetimeentryRemoveIdObj = await EmployeeTimeEntry.destroy({
      where: { id: id },
    });
    eh("delete", usrr, EmpDHC.timeentry_delete, empteobj);
    // Remove the EmployeeTimeEntry by his/her id by calling the EmployeeTimeEntry services
    return response(OK, "remove  based on id", employeetimeentryRemoveIdObj);
  } catch (error) {
    eh("delete_failed", usrr, EmpDHC.timeentry_delete, empteobj);
    // Return exception
    eh("delete_failed", usrr, EmpDHC.timeentry_delete, empteobj);
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
