"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface.describeTable('courses').then(tableDefinition => {
      if (!tableDefinition['cost_code']) {
        promises.push(queryInterface.addColumn('courses', 'cost_code', {
          type: Sequelize.STRING(30),
          allowNull: true
        }));
      }
      if (!tableDefinition['trainer_from']) {
        promises.push(queryInterface.addColumn('courses', 'trainer_from', {
          type: Sequelize.ENUM("Internal", "External"),
          allowNull: true,
          defaultValue: "Internal"
        }));
      }
      return Promise.all(promises);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("courses", "cost_code", { transaction: t }),
        queryInterface.removeColumn("courses", "trainer_from", { transaction: t })
      ]);
    });
  },
};
