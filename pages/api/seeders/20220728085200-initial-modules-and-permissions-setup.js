'use strict';

const { Op } = require('sequelize');
const { models } = require('../models');
const { module_helpers } = require('../../api/config/module_helpers');

module.exports = {
  async up() {
    let modulesCategories = {}
    for (const key in module_helpers) {
      modulesCategories[key] = Object.values(module_helpers[key])
    }

    let overAllPermissions = [];
    let modules = [];
    for (const menu in modulesCategories) {
      if (Object.hasOwnProperty.call(modulesCategories, menu)) {
        const permissions = modulesCategories[menu];
        overAllPermissions = overAllPermissions.concat(permissions);
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

    await models.modules.destroy({
      where: {
        name: {
          [Op.notIn]: overAllPermissions
        }
      }
    })

    return Promise.all(modules);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('modules', null, {});
  }
};
