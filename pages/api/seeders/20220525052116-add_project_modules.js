'use strict';

const { models } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    let user_management = "User management";
    let role_management = "Roles management";
    let employee_management = "Employee management";
    let sensitive_documents = "Sensitive documents";
    let employee_configurations = "Employee configurations";
    let site_management = "Site management";
    let course_management = "Course management";
    let training_sessions_management = "Training sessions management";
    let timesheet_management = "Timesheet management";
    let client_management = "Client management";
    let project_management = "Project management";
    let employee_project_management = "Employee project management";

    let modulesCategories = {
      [user_management]: ["Create users", "View users", "Update users", "Set user level", "Assign user roles", "Delete users"],
      [role_management]: ["Create roles", "View roles", "Update roles", "Set permissions for roles", "Delete roles"],
      [employee_management]: ["Create employees", "View employees", "Update employees", "Assign roles", "Import employees", "Change employee status", "Change designation & department", "Change report to", "Change as reporting manager", "Change probation status", "Create nominee details", "View nominee details", "Update nominee details", "Delete nominee details", "Create emergency contacts", "View emergency contacts", "Update emergency contacts", "Delete emergency contacts", "Create documents", "View documents", "Update documents", "Delete documents", "Create bank details", "View bank details", "Update bank details", "Create educations", "View educations", "Update educations", "Delete educations", "Create skills & certifications", "View skills & certifications", "Update skills & certifications", "Delete skills & certifications", "Create employment history", "View employment history", "Update employment history", "Delete employment history", "Create trainings", "View trainings", "Update trainings", "Delete trainings"],
      [sensitive_documents]: ["Create HR assessment forms", "View HR assessment forms", "Delete HR assessment forms", "Update HR assessment form status", "Create L1 assessment forms", "View L1 assessment forms", "Delete L1 assessment forms", "Update L1 assessment form status", "Create REX approval forms", "View REX approval forms", "Delete REX approval forms", "Update REX approval form status"],
      [employee_configurations]: ["Set maximum days to upload pancard"],
      [site_management]: ["Brand name", "Favicon", "Logo", "About us", "Theme settings"],
      [course_management]: ["Create courses", "View courses", "Update courses", "Delete courses"],
      [training_sessions_management]: ["Create training sessions", "View training sessions", "Update training sessions", "Delete training sessions"],
      [timesheet_management]: ["Create timesheets", "View timesheets", "Update timesheets", "Approve timesheets", "Delete timesheets", "Approve timesheet edit request"],
      [client_management]: ["Create clients", "View clients", "Update clients", "Delete clients"],
      [project_management]: ["Create projects", "View projects", "Update projects", "Delete projects"],
      [employee_project_management]: ["Assign employees to project", "Remove employees from project", "View employee project", "Update employee project"]
    }

    let modules = [];
    for (const menu in modulesCategories) {
      if (Object.hasOwnProperty.call(modulesCategories, menu)) {
        const permissions = modulesCategories[menu];
        permissions.forEach(async (permission, index) => {
          modules.push(
            models.modules.findOrCreate({
              where: {
                menu: menu,
                name: permission
              },
              defaults: {
                mod_order: index + 1,
              }
            })
          )
        });
      }
    }

    return Promise.all(modules);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('modules', null, {});
  }
};
