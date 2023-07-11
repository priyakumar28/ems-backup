const moment = require("moment");
const countries = require("./countries.json");
const { nationalities } = require("./nationalities");

export const EMPLOYEE_STATUSES = [
  { status: "Probation", status_color: "primary" },
  { status: "Active", status_color: "active_state" },
  { status: "Long absence", status_color: "absence" },
  { status: "Terminated", status_color: "terminated" },
  { status: "Deceased", status_color: "deceased" },
  { status: "Resigned", status_color: "resigned" },
];

export const PROJECT_STATUS = [
  { status: "Active", status_color: "success" },
  { status: "On Hold", status_color: "waring" },
  { status: "Completed", status_color: "primary" },
  { status: "Dropped", status_color: "danger" },
];

export const EMPLOYEE_PROJECT_STATUS = [
  { status: "Current", status_color: "success" },
  { status: "Inactive", status_color: "danger" },
  { status: "Completed", status_color: "primary" },
];

export const TIMESHEET_STATUSES = [
  { status: "Approved", status_color: "success" },
  { status: "Pending", status_color: "warning" },
  { status: "Rejected", status_color: "danger" },
  { status: "Submitted", status_color: "primary" },
];

export const PROBATION_STATUSES = [
  { status: "Active", status_color: "active" },
  { status: "Completion", status_color: "completion" },
  { status: "Extension", status_color: "extension" },
  { status: "Pre-Confirmation", status_color: "pre_confirmation" },
];

export const CLIENT_STATUSES = [
  { status: "Active", status_color: "success" },
  { status: "Inactive", status_color: "warning" },
];
export const BANK_DETAIL_STATUSES = [
  { status: "Pending", status_color: "warning" },
  { status: "Approved", status_color: "success" },
  { status: "Rejected", status_color: "danger" }
]

export const ACCOUNT_TYPE =[
  {label:"Personal", value:"Personal"},
  {label:"Salaried", value:"Salaried"}
]

export const PENDING_STATUSES = [
  { pc_status_img: "/images/check.png", pc_status_bg: "success" },
  { pc_status_img: "/images/warning-sign.png", pc_status_bg: "warning" },
];

export const PERMISSIONS = [
  { label: "Read", value: "read" },
  { label: "Add/Edit", value: "save" },
  { label: "Delete", value: "delete" },
];

export const DEPARTMENTS = [
  { code: "accounts_and_finance", name: "Accounts and Finance" },
  { code: "hr_manager", name: "HR Manager" },
  {
    code: "sales_and_marketing",
    name: "Sales and marketing (Business development)",
  },
  { code: "infrastructures", name: "Infrastructures" },
  { code: "quality_assurance", name: "Quality Assurance" },
  { code: "research_and_development", name: "Research and development" },
  { code: "learning_and_development", name: "Learning and development" },
  { code: "it_services", name: "IT services" },
  { code: "product_development", name: "Product development" },
  { code: "admin_department", name: "Admin department" },
  { code: "security_and_transport", name: "Security and transport" },
];
export const DESIGNATIONS = [
  { code: "ceo", name: "CEO" },
  { code: "cto", name: "CTO" },
  { code: "chief_innovation_officer", name: "Chief Innovation Officer" },
  { code: "chief_talent_officer", name: "Chief Talent Officer" },
  { code: "head_of_product", name: "Head of Product" },
  { code: "product_manager", name: "Product Manager" },
  { code: "vp_of_marketing", name: "VP of Marketing" },
  { code: "director_of_engineering", name: "Director of Engineering" },
  { code: "chief_architect", name: "Chief Architect" },
  { code: "software_architect", name: "Software Architect" },
  { code: "senior_solutions_architect", name: "Senior Solutions Architect" },
  { code: "engineering_project_manager", name: "Engineering Project Manager" },
  { code: "team_lead", name: "Team Lead" },
  { code: "principal_software_engineer", name: "Principal Software Engineer" },
  { code: "senior_software_engineer", name: "Senior Software Engineer" },
  { code: "software_engineer", name: "Software Engineer" },
  { code: "software_developer", name: "Software Developer" },
  { code: "junior_software_developer", name: "Junior Software Developer" },
  { code: "intern_software_developer", name: "Intern Software Developer" },
];

export const RELIGIOUS_IDENTIFICATIONS = [
  "Hinduism",
  "Buddhism",
  "Sikhism",
  "Jainism",
  "Taoism",
  "Confucianism",
  "Bahá'í",
  "Shinto",
  "Zoroastrianism",
  "Judaism",
  "Christianity",
  "Islam",
];
export const NON_RELIGIOUS_IDENTIFICATIONS = [
  "Atheism",
  "Rationalism",
  "Agnosticism",
  "Scepticism",
  "Freethinker",
  "Humanism",
];

export const isValidDate = (date) => {
  return date ? moment(date).isValid() : false;
};
export const getAge = (date) => {
  return isValidDate(date) ? parseInt(moment().diff(date, "years", true)) : 0;
};

export const getHumanReadableDate = (date) => {
  return isValidDate(date) ? moment(date).fromNow() : "null";
};

/**Sanjeev's special logic functions 200089 @public */
export const getWorkingHours = (time_start, time_end) => {
  const time1 = moment(time_start, ["h:mm A"]).format("HH:mm");
  const time2 = moment(time_end, ["h:mm A"]).format("HH:mm");

  const a = moment.duration(time1).asHours();
  const b = moment.duration(time2).asHours();

  return b - a;
};

/**Sanjeev's (200089) special logic functions  @public */
export const TimePatternMatcher = (time) => {
  let rex = /^(([0-1]+\d)|(\d)+:+[0-5]+\d+(AM|PM))$/;
  let a = time.match(rex);
  return a;
};

/**Sanjeev's (200089) special logic functions  @public */
export const CombineDateandTime = (date, time) => {
  return moment(date)
    .format("YYYY-MM-DDT")
    .concat(moment(time, ["hh:mm A"]).format("HH:mm:ss.00Z"));
};
/**Sanjeev's (200089) special logic functions,  
to check if times are overlapping @public*/

export const timeoverlap = (a, b) => {
  let exist_arr = [];
  let before_time;
  let after_time;

  a.map((x) => {
    let start = CombineDateandTime(x.date_start, x.time_start);
    let end = CombineDateandTime(x.date_end, x.time_end);
    exist_arr.push({ start_date: start, end_date: end });
  });
  let payobj = {
    start: CombineDateandTime(b.date_start, b.time_start),
    end: CombineDateandTime(b.date_end, b.time_end),
  };

  let p_start = moment(payobj.start);
  let p_end = moment(payobj.end);

  for (const element of exist_arr) {
    before_time = moment(element["start_date"]);
    let btime = new Date(before_time).toISOString();
    after_time = moment(element["end_date"]);
    let atime = new Date(after_time).toISOString();
    if (
      (p_start.isBetween(btime, atime) && p_end.isAfter(atime)) || ///condition1
      (p_start.isBefore(btime) && p_end.isBetween(btime, atime)) || ////condition2
      (p_start.isBetween(btime, atime) && p_end.isBetween(btime, atime)) || //////condition3
      (p_start.isBefore(btime) && p_end.isAfter(atime)) || /////condition4
      (p_start.isSame(btime) && p_end.isSame(atime)) ////condition5
    ) {
      return true;
    }
  }
  return false;
};
/////////to check if times are overlapping//////////////////

/**Sanjeev's (200089) special logic functions,
 * to check if dates are overlapping @public*/
export const dateoverlap = (a, b) => {
  let exist_arr = [];
  let before_date;
  let after_date;

  a.map((x) => {
    let start = moment(x.date_start);
    let end = moment(x.date_end);
    exist_arr.push({ start_date: start, end_date: end });
  });

  let payobj = {
    start: moment(b.date_start),
    end: moment(b.date_end),
  };
  let p_date_start = payobj.start;
  let p_date_end = payobj.end;

  for (const element of exist_arr) {
    before_date = moment(element["start_date"]);
    let bdate = new Date(before_date).toISOString();
    after_date = moment(element["end_date"]);
    let adate = new Date(after_date).toISOString();

    if (
      (p_date_start.isBetween(bdate, adate) && p_date_end.isAfter(adate)) ||
      (p_date_start.isBefore(bdate) && p_date_end.isBetween(bdate, adate)) ||
      (p_date_start.isBetween(bdate, adate) &&
        p_date_end.isBetween(bdate, adate)) ||
      (p_date_start.isBefore(bdate) && p_date_end.isAfter(adate)) ||
      (p_date_start.isSame(bdate) && p_date_end.isSame(adate))
    ) {
      return true;
    }
  }

  return false;
};
/////////to check if dates are overlapping//////////////////

/**Sanjeev's (200089) special logic functions,
 * To show the difference between two different dates in FE timesheet components @public */
export const CalculateTyme = (startDate, endDate) => {
  let count = 0;
  let curDate = +startDate;
  while (curDate <= +endDate) {
    count++;
    curDate = curDate + 24 * 60 * 60 * 1000;
  }
  return count;
};
/////////To show the difference between two different dates in FE timesheet components/////////////////////END//////Sanjeev-200089////////////

/**Sanjeev's (200089) special logic functions
 * to check if dates are overlapping, To show the business days (excluding Sat and Sun) @public */
export const getBusinessDatesCount = (startDate, endDate) => {
  let count = 0;
  let curDate = +startDate;
  while (curDate <= +endDate) {
    const dayOfWeek = new Date(curDate).getDay();
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
    if (!isWeekend) {
      count++;
    }
    curDate = curDate + 24 * 60 * 60 * 1000;
  }
  return count;
};
//////////To show the business days (excluding Sat and Sun)/////ENDDDD////////////////

///END////////////Sanjeeev's special logic function////////// END///////////////////////////////////////////

// export const getDeptName = (code) => {
//   let dept = DEPARTMENTS.find((x) => x.code == code?.trim());
//   return dept ? dept.name : "Not assigned";
// };

// export const getDesignName = (code) => {
//   let designation = DESIGNATIONS.find((x) => x.code == code?.trim());
//   return designation ? designation.name : "Not assigned";
// };

export const changeDateFormat = (date, format = "DD-MMM-YYYY") => {
  return isValidDate(date) ? moment(date).format(format) : "-";
};

export const getStatusColor = (status) => {
  return EMPLOYEE_STATUSES.find((x) => x.status == status?.trim())
    ?.status_color;
};

export const getStatusColors = (status) => {
  return PROJECT_STATUS.find((x) => x.status == status?.trim())?.status_color;
};

export const getCountry = (value) => {
  return countries.find((x) => x.code == value?.trim());
};

export const getNationality = (value) => {
  value = value?.trim();
  return nationalities.find(
    (x) => x.alpha_2_code == value || x.alpha_3_code == value
  );
};

export const capitalizeFirstLetter = (s) =>
  s && s[0].toUpperCase() + s.slice(1);

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const permissionColors = {
  read: "success",
  save: "secondary",
  delete: "warning",
};

export const sessionStatusColors = {
  Pending: "primary",
  Approved: "success",
  Completed: "secondary",
  Cancelled: "danger",
};

export const thousandsFormat = (amount, currency = "INR") => {
  amount = Number.isNaN(amount) ? 0 : amount;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount
  );
};

export const isValidURL = (string) => {
  if (string && typeof string == "string") {
    let res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }
  return false;
};

export const projectsStatusColors = {
  Active: "success",

  "On Hold": "warning",

  Completed: "primary",

  Dropped: "danger",
};

export const employeeprojectstatus = {
  Current: "success",
  Inactive: "danger",
  Completed: "primary",
};

export const clientsStatusColors = {
  Active: "success",
  Inactive: "warning",
};

export const timeentryColors = {
  Active: "success",
  Inactive: "warning",
};

export const TEcolorFE = {
  Active: "rgb(0, 80, 0,0.8)",
  Inactive: "rgb(220, 150, 0,0.8)",
};
export const timesheetStatusColors = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
  Submitted: "primary",
};

export const TSHEETcolorFE = {
  Approved: "rgb(0, 200, 25,0.54)",
  Pending: "rgb(220, 150, 0,0.54)",
  Rejected: "rgb(180, 0, 0, 0.54)",
  Submitted: "rgb(0, 67, 220,0.74)",
};

export const ac = (roles, mod_name, loggedUserEmail, superAdmins) => {
// <<<<<<< HEAD
//   if (roles == null || roles.length == 0) {
// =======
  if (!roles || roles.length == 0) {
// >>>>>>> bbeb539390d0358ea1559fe0a97ef7a46e4703f4
    if (superAdmins) {
      return superAdmins.includes(loggedUserEmail);
    }
    return false;
  }
  roles = typeof roles == "object" && roles.length > 0 ? roles : [];
  let rr = roles.map((role) => role.modules?.map((modules) => modules.name));
  let b = [];
  rr.forEach((e) => e.forEach((a) => b.push(a)));
  return b.includes(mod_name) || superAdmins.includes(loggedUserEmail);
};

export const removeURLParameters = (removeParams) => { 
    const deleteRegex = new RegExp(removeParams.join('=|') + '=')

    const params = location.search.slice(1).split('&')
    let search = []
    for (const element of params) if (deleteRegex.test(element) === false) search.push(element)

    window.history.replaceState({}, document.title, location.pathname + (search.length ? '?' + search.join('&') : '') + location.hash)
}