"use strict";

const { models } = require("../models");
const { module_helpers } = require("../../api/config/module_helpers");

module.exports = {
  async up(queryInterface, Sequelize) {
    let modulesCategories = {};
    for (const key in module_helpers) {
      modulesCategories[key] = Object.values(module_helpers[key]);
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
                name: permission,
              },
              defaults: {
                mod_order: index + 1,
              },
            })
          );
        });
      }
    }

    return Promise.all(modules);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("modules", null, {});
  },
};
