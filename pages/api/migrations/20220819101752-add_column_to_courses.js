"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface.describeTable('courses').then(tableDefinition => {
      if (!tableDefinition['contact_number']) {
        promises.push(queryInterface.addColumn('courses', 'contact_number', {
          type: Sequelize.STRING(50),
          allowNull: true
        }));
      }
      if (!tableDefinition['contact_mail']) {
        promises.push(queryInterface.addColumn('courses', 'contact_mail', {
          type: Sequelize.STRING(50),
          allowNull: true
        }));
      }
      return Promise.all(promises);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("courses", "contact_number", { transaction: t }),
        queryInterface.removeColumn("courses", "contact_mail", { transaction: t })
      ]);
    });
  },
};
