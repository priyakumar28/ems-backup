"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface.describeTable('reportingmanagers').then(tableDefinition => {
      if (!tableDefinition['createdBy']) {
        promises.push(queryInterface.addColumn('reportingmanagers', 'createdBy', {
          type: Sequelize.BIGINT,
          allowNull: true,
          references: {
            model: "employees",
            key: "id",
          },
        }));
      }
      return Promise.all(promises);
    });

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("reportingmanagers", "createdBy", { transaction: t })
      ]);
    });
  },
};
