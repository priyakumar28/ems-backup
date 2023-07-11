const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require("../../config/status_codes");
const {
  models: {
    employees: Employee,
    clients: Clients,
    projects: Projects,
    courses: Courses,
    users: Users,
    userroles: Userroles,
    department: department,
    designation: Designation,
  },
} = require("../../models");

exports.list = async () => {
  try {
    let emp_count = await Employee.count({ where: { probation: "Active" } });
    let clients_count = await Clients.count({ where: { status: "Active" } });
    let projects_count = await Projects.count({ where: { status: "Active" } });
    let courses_count = await Courses.count({ where: { status: "Active" } });
    let user_count = await Users.count({
      where: { user_level: ["Admin", "Manager", "Other"] },
    });
    let roles_count = await Userroles.count();
    let dep_count = await department.count();
    let desig_count = await Designation.count();

    let DD = {
      emp_count: emp_count,
      clients_count: clients_count,
      projects_count: projects_count,
      courses_count: courses_count,
      user_count: user_count,
      roles_count: roles_count,
      dep_count: dep_count,
      desig_count: desig_count,
    };
    return response(OK, "list of DashboardData", DD);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
