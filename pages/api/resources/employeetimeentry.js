const employeeresources = require("./employees");
const projectresources = require("./projects");
const employeetimesheetsresources = require("./employeetimesheets");
const { TSHEETcolorFE } = require("../../../lib/helpers");

const { getWorkingHours, CombineDateandTime } = require("../../../lib/helpers");

module.exports = {
  //single transformation
  transform(employeetimeentry) {
    if (employeetimeentry && typeof employeetimeentry === "object") {
      return {
        id: employeetimeentry.id,
        project: projectresources.transform(employeetimeentry.project_project),
        employee: employeeresources.transform(
          employeetimeentry.employee_employee
        ),
        timesheet: employeetimeentry.timesheet,
        details: employeetimeentry.details,
        created: employeetimeentry.created,
        date_start: employeetimeentry.date_start,
        time_start: employeetimeentry.time_start,
        date_end: employeetimeentry.date_end,
        time_end: employeetimeentry.time_end,
        status: employeetimeentry.status,
      };
    }
    return {};
  },

  /////////////to view as FullCalendar events //////////////

  eventTransform(e) {
    if (e && typeof e === "object") {
      let projname = projectresources.transform(e.project_project).name;
      let hours =
        Math.round(getWorkingHours(e.time_start, e.time_end) * 100) / 100;

      return {
        id: e.id,
        title: `Project: ${projname}, Task: ${e.details}, time spent: ${
          hours == 1 ? hours + " hr" : hours + " hrs"
        }
        
        
        `,
        time_start: e.time_start,
        time_end: e.time_end,
        start: CombineDateandTime(e.date_start, e.time_start),
        end: CombineDateandTime(e.date_end, e.time_end),
        total_hours: getWorkingHours(e.time_start, e.time_end),
        employee: employeeresources.transform(e.employee_employee),
        timesheet: e.timesheet,
        project: e.project,
        projname: projname,
        details: e.details,
        created: e.created,
        status: e.status,
        date_start: e.date_start,
        date_end: e.date_end,
        color: TSHEETcolorFE[e.timesheet_employeetimesheet.status],
        textColor: "rgb(500, 500, 500,1)",
        timesheet_status: e.timesheet_employeetimesheet.status,
      };
    } else {
      return {};
    }
  },

  eventTransformCollection(employeeovertime) {
    employeeovertime =
      typeof employeeovertime === "object" ? employeeovertime : [];
    let data = [];
    for (let i in employeeovertime) {
      data.push(this.eventTransform(employeeovertime[i]));
    }
    return data;
  },
  /////////////////////////////FullCalendar  /////////////////////////////

  transformCollection(employeeovertime) {
    employeeovertime =
      typeof employeeovertime === "object" ? employeeovertime : [];
    let data = [];
    for (let i in employeeovertime) {
      data.push(this.transform(employeeovertime[i]));
    }
    return data;
  },
};
