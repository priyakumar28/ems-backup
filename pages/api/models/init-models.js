let _applications = require("./applications");
let _archivedemployees = require("./archivedemployees");
let _attendance = require("./attendance");
let _auditlog = require("./auditlog");
let _benifits = require("./benifits");
let _calls = require("./calls");
let _candidates = require("./candidates");
let _certifications = require("./certifications");
let _clients = require("./clients");
let _companydocuments = require("./companydocuments");
let _companyloans = require("./companyloans");
let _companystructures = require("./companystructures");
let _country = require("./country");
let _courses = require("./courses");
let _crons = require("./crons");
let _currencytypes = require("./currencytypes");
let _customfields = require("./customfields");
let _customfieldvalues = require("./customfieldvalues");
let _dataentrybackups = require("./dataentrybackups");
let _dataimport = require("./dataimport");
let _dataimportfiles = require("./dataimportfiles");
let _deductiongroup = require("./deductiongroup");
let _deductions = require("./deductions");
let _documents = require("./documents");
let _educationlevel = require("./educationlevel");
let _educations = require("./educations");
let _emails = require("./emails");
let _emergencycontacts = require("./emergencycontacts");
let _employeeapprovals = require("./employeeapprovals");
let _employeeattendancesheets = require("./employeeattendancesheets");
let _employeecertifications = require("./employeecertifications");
let _employeeemploymenthistory = require("./employeeemploymenthistory");
let _employeecompanyloans = require("./employeecompanyloans");
let _employeedatahistory = require("./employeedatahistory");
let _employeedependents = require("./employeedependents");
let _employeedocuments = require("./employeedocuments");
let _employerdocuments = require("./employerdocuments");
let _employeeeducations = require("./employeeeducations");
let _employeeethnicity = require("./employeeethnicity");
let _employeeexpenses = require("./employeeexpenses");
let _employeeforms = require("./employeeforms");
let _employeeimmigrations = require("./employeeimmigrations");
let _employeeimmigrationstatus = require("./employeeimmigrationstatus");
let _employeelanguages = require("./employeelanguages");
let _employeeleavedays = require("./employeeleavedays");
let _employeeleavelog = require("./employeeleavelog");
let _employeeleaves = require("./employeeleaves");
let _employeeovertime = require("./employeeovertime");
let _employeeprojects = require("./employeeprojects");
let _employees = require("./employees");
let _employeesalary = require("./employeesalary");
let _employeeskills = require("./employeeskills");
let _employeetimeentry = require("./employeetimeentry");
let _employeetimesheets = require("./employeetimesheets");
let _employeetrainingsessions = require("./employeetrainingsessions");
let _employeetravelrecords = require("./employeetravelrecords");
let _employementtype = require("./employementtype");
let _employmentstatus = require("./employmentstatus");
let _ethnicity = require("./ethnicity");
let _expensescategories = require("./expensescategories");
let _expensespaymentmethods = require("./expensespaymentmethods");
let _experiencelevel = require("./experiencelevel");
let _fieldnamemappings = require("./fieldnamemappings");
let _files = require("./files");
let _forms = require("./forms");
let _holidays = require("./holidays");
let _immigrationdocuments = require("./immigrationdocuments");
let _immigrationstatus = require("./immigrationstatus");
let _industry = require("./industry");
let _interviews = require("./interviews");
let _job = require("./job");
let _jobfunction = require("./jobfunction");
let _jobtitles = require("./jobtitles");
let _languages = require("./languages");
let _leavegroupemployees = require("./leavegroupemployees");
let _leavegroups = require("./leavegroups");
let _leaveperiods = require("./leaveperiods");
let _leaverules = require("./leaverules");
let _leavestartingbalance = require("./leavestartingbalance");
let _leavetypes = require("./leavetypes");
let _migrations = require("./migrations");
let _modules = require("./modules");
let _nationality = require("./nationality");
let _nomineedetails = require("./nomineedetails");
let _notifications = require("./notifications");
let _overtimecategories = require("./overtimecategories");
let _payfrequency = require("./payfrequency");
let _paygrades = require("./paygrades");
let _payroll = require("./payroll");
let _payrollcolumns = require("./payrollcolumns");
let _payrollcolumntemplates = require("./payrollcolumntemplates");
let _payrolldata = require("./payrolldata");
let _payrollemployees = require("./payrollemployees");
let _paysliptemplates = require("./paysliptemplates");
let _permissions = require("./permissions");
let _projects = require("./projects");
let _province = require("./province");
let _reportfiles = require("./reportfiles");
let _reports = require("./reports");
let _restaccesstokens = require("./restaccesstokens");
let _salarycomponent = require("./salarycomponent");
let _salarycomponenttype = require("./salarycomponenttype");
let _settings = require("./settings");
let _skills = require("./skills");
let _statuschangelogs = require("./statuschangelogs");
let _supportedlanguages = require("./supportedlanguages");
let _tags = require("./tags");
let _timezones = require("./timezones");
let _trainingsessions = require("./trainingsessions");
let _userreports = require("./userreports");
let _userroles = require("./userroles");
let _users = require("./users");
let _workdays = require("./workdays");
let _bankdetails = require("./bankdetails");
let _department = require("./department");
let _designation = require("./designation");

function initModels(sequelize, Sequelize) {
  let job = _job(sequelize, Sequelize);
  let candidates = _candidates(sequelize, Sequelize);
  let applications = _applications(sequelize, Sequelize);
  let nationality = _nationality(sequelize, Sequelize);
  let employmentstatus = _employmentstatus(sequelize, Sequelize);
  let jobtitles = _jobtitles(sequelize, Sequelize);
  let currencytypes = _currencytypes(sequelize, Sequelize);
  let paygrades = _paygrades(sequelize, Sequelize);
  let country = _country(sequelize, Sequelize);
  let province = _province(sequelize, Sequelize);
  let companystructures = _companystructures(sequelize, Sequelize);
  let employees = _employees(sequelize, Sequelize);
  let bankdetails = _bankdetails(sequelize, Sequelize);
  let archivedemployees = _archivedemployees(sequelize, Sequelize);
  let attendance = _attendance(sequelize, Sequelize);
  let supportedlanguages = _supportedlanguages(sequelize, Sequelize);
  let users = _users(sequelize, Sequelize);
  let auditlog = _auditlog(sequelize, Sequelize);
  let benifits = _benifits(sequelize, Sequelize);
  let calls = _calls(sequelize, Sequelize);
  let certifications = _certifications(sequelize, Sequelize);
  let clients = _clients(sequelize, Sequelize);
  let companydocuments = _companydocuments(sequelize, Sequelize);
  let companyloans = _companyloans(sequelize, Sequelize);
  let courses = _courses(sequelize, Sequelize);
  let crons = _crons(sequelize, Sequelize);
  let customfields = _customfields(sequelize, Sequelize);
  let customfieldvalues = _customfieldvalues(sequelize, Sequelize);
  let dataentrybackups = _dataentrybackups(sequelize, Sequelize);
  let dataimport = _dataimport(sequelize, Sequelize);
  let dataimportfiles = _dataimportfiles(sequelize, Sequelize);
  let deductiongroup = _deductiongroup(sequelize, Sequelize);
  let deductions = _deductions(sequelize, Sequelize);
  let documents = _documents(sequelize, Sequelize);
  let educationlevel = _educationlevel(sequelize, Sequelize);
  let educations = _educations(sequelize, Sequelize);
  let emails = _emails(sequelize, Sequelize);
  let emergencycontacts = _emergencycontacts(sequelize, Sequelize);
  let employeeapprovals = _employeeapprovals(sequelize, Sequelize);
  let employeeattendancesheets = _employeeattendancesheets(
    sequelize,
    Sequelize
  );
  let employeecertifications = _employeecertifications(sequelize, Sequelize);
  let employeeemploymenthistory = _employeeemploymenthistory(
    sequelize,
    Sequelize
  );
  let employeecompanyloans = _employeecompanyloans(sequelize, Sequelize);
  let employeedatahistory = _employeedatahistory(sequelize, Sequelize);
  let employeedependents = _employeedependents(sequelize, Sequelize);
  let employeedocuments = _employeedocuments(sequelize, Sequelize);
  let employerdocuments = _employerdocuments(sequelize, Sequelize);
  let employeeeducations = _employeeeducations(sequelize, Sequelize);
  let ethnicity = _ethnicity(sequelize, Sequelize);
  let employeeethnicity = _employeeethnicity(sequelize, Sequelize);
  let expensespaymentmethods = _expensespaymentmethods(sequelize, Sequelize);
  let expensescategories = _expensescategories(sequelize, Sequelize);
  let employeeexpenses = _employeeexpenses(sequelize, Sequelize);
  let forms = _forms(sequelize, Sequelize);
  let employeeforms = _employeeforms(sequelize, Sequelize);
  let immigrationdocuments = _immigrationdocuments(sequelize, Sequelize);
  let employeeimmigrations = _employeeimmigrations(sequelize, Sequelize);
  let immigrationstatus = _immigrationstatus(sequelize, Sequelize);
  let employeeimmigrationstatus = _employeeimmigrationstatus(
    sequelize,
    Sequelize
  );
  let languages = _languages(sequelize, Sequelize);
  let employeelanguages = _employeelanguages(sequelize, Sequelize);
  let leavetypes = _leavetypes(sequelize, Sequelize);
  let leaveperiods = _leaveperiods(sequelize, Sequelize);
  let employeeleaves = _employeeleaves(sequelize, Sequelize);
  let employeeleavedays = _employeeleavedays(sequelize, Sequelize);
  let employeeleavelog = _employeeleavelog(sequelize, Sequelize);
  let overtimecategories = _overtimecategories(sequelize, Sequelize);
  let employeeovertime = _employeeovertime(sequelize, Sequelize);
  let projects = _projects(sequelize, Sequelize);
  let employeeprojects = _employeeprojects(sequelize, Sequelize);
  let employeesalary = _employeesalary(sequelize, Sequelize);
  let skills = _skills(sequelize, Sequelize);
  let employeeskills = _employeeskills(sequelize, Sequelize);
  let employeetimesheets = _employeetimesheets(sequelize, Sequelize);
  let employeetimeentry = _employeetimeentry(sequelize, Sequelize);
  let trainingsessions = _trainingsessions(sequelize, Sequelize);
  let employeetrainingsessions = _employeetrainingsessions(
    sequelize,
    Sequelize
  );
  let employeetravelrecords = _employeetravelrecords(sequelize, Sequelize);
  let employementtype = _employementtype(sequelize, Sequelize);
  let experiencelevel = _experiencelevel(sequelize, Sequelize);
  let fieldnamemappings = _fieldnamemappings(sequelize, Sequelize);
  let files = _files(sequelize, Sequelize);
  let holidays = _holidays(sequelize, Sequelize);
  let industry = _industry(sequelize, Sequelize);
  let interviews = _interviews(sequelize, Sequelize);
  let jobfunction = _jobfunction(sequelize, Sequelize);
  let leavegroups = _leavegroups(sequelize, Sequelize);
  let leavegroupemployees = _leavegroupemployees(sequelize, Sequelize);
  let leaverules = _leaverules(sequelize, Sequelize);
  let leavestartingbalance = _leavestartingbalance(sequelize, Sequelize);
  let migrations = _migrations(sequelize, Sequelize);
  let modules = _modules(sequelize, Sequelize);
  let nomineedetails = _nomineedetails(sequelize, Sequelize);
  let notifications = _notifications(sequelize, Sequelize);
  let payfrequency = _payfrequency(sequelize, Sequelize);
  let payroll = _payroll(sequelize, Sequelize);
  let payrollcolumns = _payrollcolumns(sequelize, Sequelize);
  let payrollcolumntemplates = _payrollcolumntemplates(sequelize, Sequelize);
  let payrolldata = _payrolldata(sequelize, Sequelize);
  let payrollemployees = _payrollemployees(sequelize, Sequelize);
  let paysliptemplates = _paysliptemplates(sequelize, Sequelize);
  let permissions = _permissions(sequelize, Sequelize);
  let reportfiles = _reportfiles(sequelize, Sequelize);
  let reports = _reports(sequelize, Sequelize);
  let restaccesstokens = _restaccesstokens(sequelize, Sequelize);
  let salarycomponenttype = _salarycomponenttype(sequelize, Sequelize);
  let salarycomponent = _salarycomponent(sequelize, Sequelize);
  let settings = _settings(sequelize, Sequelize);
  let statuschangelogs = _statuschangelogs(sequelize, Sequelize);
  let tags = _tags(sequelize, Sequelize);
  let timezones = _timezones(sequelize, Sequelize);
  let userreports = _userreports(sequelize, Sequelize);
  let userroles = _userroles(sequelize, Sequelize);
  let workdays = _workdays(sequelize, Sequelize);
  let department = _department(sequelize, Sequelize);
  let designation = _designation(sequelize, Sequelize);

  applications.belongsTo(candidates, {
    as: "candidate_candidate",
    foreignKey: "candidate",
  });
  candidates.hasMany(applications, {
    as: "applications",
    foreignKey: "candidate",
  });
  bankdetails.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "emp_id",
  });
  employees.hasMany(bankdetails, { as: "bankdetails", foreignKey: "emp_id" });

  designation.belongsTo(department, {
    as: "department_department",
    foreignKey: "department",
    onDelete: "CASCADE"
  });
  department.hasMany(designation, { as: "designation", foreignKey: "department", onDelete: "CASCADE" });

  calls.belongsTo(candidates, {
    as: "candidate_candidate",
    foreignKey: "candidate",
  });
  candidates.hasMany(calls, { as: "calls_calls", foreignKey: "candidate" });
  interviews.belongsTo(candidates, {
    as: "candidate_candidate",
    foreignKey: "candidate",
  });
  candidates.hasMany(interviews, { as: "interviews", foreignKey: "candidate" });
  employeecertifications.belongsTo(certifications, {
    as: "certification",
    foreignKey: "certification_id",
  });
  certifications.hasMany(employeecertifications, {
    as: "employeecertifications",
    foreignKey: "certification_id",
  });
  projects.belongsTo(clients, { as: "client_client", foreignKey: "client" });
  clients.hasMany(projects, { as: "projects", foreignKey: "client" });
  employeecompanyloans.belongsTo(companyloans, {
    as: "loan_companyloan",
    foreignKey: "loan",
  });
  companyloans.hasMany(employeecompanyloans, {
    as: "employeecompanyloans",
    foreignKey: "loan",
  });
  companystructures.hasMany(companystructures, {
    as: "companystructures",
    foreignKey: "parent",
  });

  trainingsessions.belongsTo(courses, {
    as: "course_course",
    foreignKey: "course",
  });
  courses.hasMany(trainingsessions, {
    as: "trainingsessions",
    foreignKey: "course",
  });
  employeesalary.belongsTo(currencytypes, {
    as: "currency_currencytype",
    foreignKey: "currency",
  });
  currencytypes.hasMany(employeesalary, {
    as: "employeesalaries",
    foreignKey: "currency",
  });
  paygrades.belongsTo(currencytypes, {
    as: "currency_currencytype",
    foreignKey: "currency",
  });
  currencytypes.hasMany(paygrades, { as: "paygrades", foreignKey: "currency" });
  deductions.belongsTo(deductiongroup, {
    as: "deduction_group_deductiongroup",
    foreignKey: "deduction_group",
  });
  deductiongroup.hasMany(deductions, {
    as: "deductions",
    foreignKey: "deduction_group",
  });
  payrollemployees.belongsTo(deductiongroup, {
    as: "deduction_group_deductiongroup",
    foreignKey: "deduction_group",
  });
  deductiongroup.hasMany(payrollemployees, {
    as: "payrollemployees",
    foreignKey: "deduction_group",
  });
  employeedocuments.belongsTo(documents, {
    as: "document_document",
    foreignKey: "document",
  });
  documents.hasMany(employeedocuments, {
    as: "employeedocuments",
    foreignKey: "document",
  });
  employerdocuments.belongsTo(documents, {
    as: "document_document",
    foreignKey: "document",
  });
  documents.hasMany(employerdocuments, {
    as: "employerdocuments",
    foreignKey: "document",
  });

  employeeeducations.belongsTo(educations, {
    as: "education",
    foreignKey: "education_id",
  });
  educations.hasMany(employeeeducations, {
    as: "employeeeducations",
    foreignKey: "education_id",
  });
  employeeleavedays.belongsTo(employeeleaves, {
    as: "employee_leave_employeeleave",
    foreignKey: "employee_leave",
  });
  employeeleaves.hasMany(employeeleavedays, {
    as: "employeeleavedays",
    foreignKey: "employee_leave",
  });
  employeeleavelog.belongsTo(employeeleaves, {
    as: "employee_leave_employeeleave",
    foreignKey: "employee_leave",
  });
  employeeleaves.hasMany(employeeleavelog, {
    as: "employeeleavelogs",
    foreignKey: "employee_leave",
  });
  attendance.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(attendance, { as: "attendances", foreignKey: "employee" });
  courses.belongsTo(employees, {
    as: "coordinator_employee",
    foreignKey: "coordinator",
  });
  employees.hasMany(courses, { as: "courses", foreignKey: "coordinator" });
  emergencycontacts.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(emergencycontacts, {
    as: "emergencycontacts",
    foreignKey: "employee",
  });
  employeeattendancesheets.belongsTo(employees, {
    as: "employee",
    foreignKey: "employee_id",
  });
  employees.hasMany(employeeattendancesheets, {
    as: "employeeattendancesheets",
    foreignKey: "employee_id",
  });
  employeecertifications.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employeeemploymenthistory.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeemploymenthistory, {
    as: "employee_employmenthistory",
    foreignKey: "employee",
  });
  employees.hasMany(employeecertifications, {
    as: "employeecertifications",
    foreignKey: "employee",
  });
  employeecompanyloans.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeecompanyloans, {
    as: "employeecompanyloans",
    foreignKey: "employee",
  });
  employeedatahistory.belongsTo(employees, {
    as: "employee",
    foreignKey: "employee_id",
  });
  employees.hasMany(employeedatahistory, {
    as: "employeedatahistories",
    foreignKey: "employee_id",
  });
  employeedependents.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeedependents, {
    as: "employeedependents",
    foreignKey: "employee",
  });
  employeedocuments.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeedocuments, {
    as: "employeedocuments",
    foreignKey: "employee",
  });
  employerdocuments.belongsTo(users, {
    as: "employer_document_user",
    foreignKey: "user",
  });
  users.hasMany(employerdocuments, {
    as: "employerdocuments",
    foreignKey: "user",
  });
  employerdocuments.belongsTo(employees, {
    as: "employer_document_employees",
    foreignKey: "employee",
  });
  employees.hasMany(employerdocuments, {
    as: "employerdocuments",
    foreignKey: "employee",
  });
  employeeeducations.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeeducations, {
    as: "employeeeducations",
    foreignKey: "employee",
  });
  employeeethnicity.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeethnicity, {
    as: "employeeethnicities",
    foreignKey: "employee",
  });
  employeeexpenses.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeexpenses, {
    as: "employeeexpenses",
    foreignKey: "employee",
  });
  employeeforms.belongsTo(employees, {
    as: "employee",
    foreignKey: "employee_id",
  });
  employees.hasMany(employeeforms, {
    as: "employeeforms",
    foreignKey: "employee_id",
  });
  employeeimmigrations.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeimmigrations, {
    as: "employeeimmigrations",
    foreignKey: "employee",
  });
  employeeimmigrationstatus.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeimmigrationstatus, {
    as: "employeeimmigrationstatuses",
    foreignKey: "employee",
  });
  employeelanguages.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeelanguages, {
    as: "employeelanguages",
    foreignKey: "employee",
  });
  employeeleaves.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeleaves, {
    as: "employeeleaves",
    foreignKey: "employee",
  });
  employeeovertime.belongsTo(employees, {
    as: "employee",
    foreignKey: "employee_id",
  });
  employees.hasMany(employeeovertime, {
    as: "employeeovertimes",
    foreignKey: "employee_id",
  });
  employeeprojects.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeprojects, {
    as: "employeeprojects",
    foreignKey: "employee",
  });
  employees.belongsTo(employees, {
    as: "supervisor_employee",
    foreignKey: "supervisor",
  });
  employees.hasMany(employees, { as: "employees", foreignKey: "supervisor" });
  employeesalary.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeesalary, {
    as: "employeesalaries",
    foreignKey: "employee",
  });
  employeeskills.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeeskills, {
    as: "employeeskills",
    foreignKey: "employee",
  });
  employeetimeentry.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeetimeentry, {
    as: "employeetimeentries",
    foreignKey: "employee",
  });
  employeetimesheets.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeetimesheets, {
    as: "employeetimesheets",
    foreignKey: "employee",
  });
  employeetrainingsessions.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeetrainingsessions, {
    as: "employeetrainingsessions",
    foreignKey: "employee",
  });
  employeetravelrecords.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(employeetravelrecords, {
    as: "employeetravelrecords",
    foreignKey: "employee",
  });
  leavegroupemployees.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasOne(leavegroupemployees, {
    as: "leavegroupemployee",
    foreignKey: "employee",
  });
  payrollemployees.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasOne(payrollemployees, {
    as: "payrollemployee",
    foreignKey: "employee",
  });
  users.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasOne(users, { as: "users", foreignKey: "employee" });
  employeetimeentry.belongsTo(employeetimesheets, {
    as: "timesheet_employeetimesheet",
    foreignKey: "timesheet",
  });
  employeetimesheets.hasMany(employeetimeentry, {
    as: "employeetimeentries",
    foreignKey: "timesheet",
  });
  employees.belongsTo(employmentstatus, {
    as: "employment_status_employmentstatus",
    foreignKey: "employment_status",
  });
  employmentstatus.hasMany(employees, {
    as: "employees",
    foreignKey: "employment_status",
  });
  employeeethnicity.belongsTo(ethnicity, {
    as: "ethnicity_ethnicity",
    foreignKey: "ethnicity",
  });
  ethnicity.hasMany(employeeethnicity, {
    as: "employeeethnicities",
    foreignKey: "ethnicity",
  });
  employeeexpenses.belongsTo(expensescategories, {
    as: "category_expensescategory",
    foreignKey: "category",
  });
  expensescategories.hasMany(employeeexpenses, {
    as: "employeeexpenses",
    foreignKey: "category",
  });
  employeeexpenses.belongsTo(expensespaymentmethods, {
    as: "payment_method_expensespaymentmethod",
    foreignKey: "payment_method",
  });
  expensespaymentmethods.hasMany(employeeexpenses, {
    as: "employeeexpenses",
    foreignKey: "payment_method",
  });
  employeeforms.belongsTo(forms, { as: "form", foreignKey: "form_id" });
  forms.hasMany(employeeforms, { as: "employeeforms", foreignKey: "form_id" });
  employeeimmigrations.belongsTo(immigrationdocuments, {
    as: "document_immigrationdocument",
    foreignKey: "document",
  });
  immigrationdocuments.hasMany(employeeimmigrations, {
    as: "employeeimmigrations",
    foreignKey: "document",
  });
  employeeimmigrationstatus.belongsTo(immigrationstatus, {
    as: "status_immigrationstatus",
    foreignKey: "status",
  });
  immigrationstatus.hasMany(employeeimmigrationstatus, {
    as: "employeeimmigrationstatuses",
    foreignKey: "status",
  });
  applications.belongsTo(job, { as: "job_job", foreignKey: "job" });
  job.hasMany(applications, { as: "applications", foreignKey: "job" });
  calls.belongsTo(job, { as: "job_job", foreignKey: "job" });
  job.hasMany(calls, { as: "calls", foreignKey: "job" });
  interviews.belongsTo(job, { as: "job_job", foreignKey: "job" });
  job.hasMany(interviews, { as: "interviews", foreignKey: "job" });
  employees.belongsTo(jobtitles, {
    as: "job_title_jobtitle",
    foreignKey: "job_title",
  });
  jobtitles.hasMany(employees, { as: "employees", foreignKey: "job_title" });
  employeelanguages.belongsTo(languages, {
    as: "language",
    foreignKey: "language_id",
  });
  languages.hasMany(employeelanguages, {
    as: "employeelanguages",
    foreignKey: "language_id",
  });
  leavegroupemployees.belongsTo(leavegroups, {
    as: "leave_group_leavegroup",
    foreignKey: "leave_group",
  });
  leavegroups.hasMany(leavegroupemployees, {
    as: "leavegroupemployees",
    foreignKey: "leave_group",
  });
  employeeleaves.belongsTo(leaveperiods, {
    as: "leave_period_leaveperiod",
    foreignKey: "leave_period",
  });
  leaveperiods.hasMany(employeeleaves, {
    as: "employeeleaves",
    foreignKey: "leave_period",
  });
  employeeleaves.belongsTo(leavetypes, {
    as: "leave_type_leavetype",
    foreignKey: "leave_type",
  });
  leavetypes.hasMany(employeeleaves, {
    as: "employeeleaves",
    foreignKey: "leave_type",
  });

  nomineedetails.belongsTo(employees, {
    as: "employee_employee",
    foreignKey: "employee",
  });
  employees.hasMany(nomineedetails, {
    as: "nomineedetails",
    foreignKey: "employee",
  });

  employeeovertime.belongsTo(overtimecategories, {
    as: "category",
    foreignKey: "category_id",
  });
  overtimecategories.hasMany(employeeovertime, {
    as: "employeeovertimes",
    foreignKey: "category_id",
  });
  employees.belongsTo(paygrades, {
    as: "pay_grade_paygrade",
    foreignKey: "pay_grade",
  });
  paygrades.hasMany(employees, { as: "employees", foreignKey: "pay_grade" });
  payrolldata.belongsTo(payroll, {
    as: "payroll_payroll",
    foreignKey: "payroll",
  });
  payroll.hasMany(payrolldata, { as: "payrolldata", foreignKey: "payroll" });
  employeeprojects.belongsTo(projects, {
    as: "project_project",
    foreignKey: "project",
  });
  projects.hasMany(employeeprojects, {
    as: "employeeprojects",
    foreignKey: "project",
  });
  employeetimeentry.belongsTo(projects, {
    as: "project_project",
    foreignKey: "project",
  });
  projects.hasMany(employeetimeentry, {
    as: "employeetimeentries",
    foreignKey: "project",
  });
  employees.belongsTo(province, {
    as: "province_province",
    foreignKey: "province",
  });
  province.hasMany(employees, { as: "employees", foreignKey: "province" });
  employees.belongsTo(department, {
    as: "department_department",
    foreignKey: "department",
  });
  department.hasMany(employees, { as: "employees", foreignKey: "department" });
  employees.belongsTo(designation, {
    as: "designation_designation",
    foreignKey: "designation",
  });
  designation.hasMany(employees, { as: "employees", foreignKey: "designation" });
  salarycomponent.belongsTo(salarycomponenttype, {
    as: "componenttype_salarycomponenttype",
    foreignKey: "componenttype",
  });
  salarycomponenttype.hasMany(salarycomponent, {
    as: "salarycomponents",
    foreignKey: "componenttype",
  });
  employeeskills.belongsTo(skills, { as: "skill", foreignKey: "skill_id" });
  skills.hasMany(employeeskills, {
    as: "employeeskills",
    foreignKey: "skill_id",
  });
  users.belongsTo(supportedlanguages, {
    as: "lang_supportedlanguage",
    foreignKey: "lang",
  });
  supportedlanguages.hasMany(users, { as: "users", foreignKey: "lang" });
  employeetrainingsessions.belongsTo(trainingsessions, {
    as: "trainingsession_trainingsession",
    foreignKey: "trainingsession",
  });
  trainingsessions.hasMany(employeetrainingsessions, {
    as: "employeetrainingsessions",
    foreignKey: "trainingsession",
  });
  auditlog.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(auditlog, { as: "auditlogs", foreignKey: "user_id" });
  employeedatahistory.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(employeedatahistory, {
    as: "employeedatahistories",
    foreignKey: "user_id",
  });
  employeeleavelog.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(employeeleavelog, {
    as: "employeeleavelogs",
    foreignKey: "user_id",
  });
  notifications.belongsTo(users, { as: "touser_user", foreignKey: "touser" });
  users.hasMany(notifications, { as: "notifications", foreignKey: "touser" });
  users.belongsToMany(userroles, {
    as: "users_userroles",
    through: "usersroles",
  });
  department.belongsToMany(employees, {
    as: "rms_employees_department",
    through: 'reportingmanagers'
  })
  modules.belongsToMany(permissions, {
    as: "modules_permissions",
    through: "modulepermissions",
  });
  userroles.belongsToMany(modules, {
    as: "userroles_modules",
    through: "userrolemodules",
  });
  userroles.belongsToMany(modules, {
    as: "userroles_assignmodules",
    through: "userroleassignmodules",
  });
  employeeprojects.belongsToMany(userroles, {
    as: "employeeprojects_userroles",
    through: "employeeprojectuserroles",
  });

  return {
    applications,
    archivedemployees,
    attendance,
    auditlog,
    bankdetails,
    benifits,
    calls,
    candidates,
    certifications,
    clients,
    companydocuments,
    companyloans,
    companystructures,
    country,
    courses,
    crons,
    currencytypes,
    customfields,
    customfieldvalues,
    dataentrybackups,
    dataimport,
    dataimportfiles,
    deductiongroup,
    deductions,
    department,
    designation,
    documents,
    educationlevel,
    educations,
    emails,
    emergencycontacts,
    employeeapprovals,
    employeeattendancesheets,
    employeecertifications,
    employeeemploymenthistory,
    employeecompanyloans,
    employeedatahistory,
    employeedependents,
    employeedocuments,
    employerdocuments,
    employeeeducations,
    employeeethnicity,
    employeeexpenses,
    employeeforms,
    employeeimmigrations,
    employeeimmigrationstatus,
    employeelanguages,
    employeeleavedays,
    employeeleavelog,
    employeeleaves,
    employeeovertime,
    employeeprojects,
    employees,
    employeesalary,
    employeeskills,
    employeetimeentry,
    employeetimesheets,
    employeetrainingsessions,
    employeetravelrecords,
    employementtype,
    employmentstatus,
    ethnicity,
    expensescategories,
    expensespaymentmethods,
    experiencelevel,
    fieldnamemappings,
    files,
    forms,
    holidays,
    immigrationdocuments,
    immigrationstatus,
    industry,
    interviews,
    job,
    jobfunction,
    jobtitles,
    languages,
    leavegroupemployees,
    leavegroups,
    leaveperiods,
    leaverules,
    leavestartingbalance,
    leavetypes,
    migrations,
    modules,
    nationality,
    nomineedetails,
    notifications,
    overtimecategories,
    payfrequency,
    paygrades,
    payroll,
    payrollcolumns,
    payrollcolumntemplates,
    payrolldata,
    payrollemployees,
    paysliptemplates,
    permissions,
    projects,
    province,
    reportfiles,
    reports,
    restaccesstokens,
    salarycomponent,
    salarycomponenttype,
    settings,
    skills,
    statuschangelogs,
    supportedlanguages,
    tags,
    timezones,
    trainingsessions,
    userreports,
    userroles,
    users,
    workdays,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
