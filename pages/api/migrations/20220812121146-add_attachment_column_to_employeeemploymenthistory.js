"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let promises = [];
    return queryInterface
      .describeTable("employeeemploymenthistory")
      .then((tableDefinition) => {
        if (!tableDefinition["attachment"]) {
          promises.push(
            queryInterface.addColumn(
              "employeeemploymenthistory",
              "attachment",
              {
                type: Sequelize.TEXT,
                allowNull: true,
              }
            )
          );
        }
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("employeeemploymenthistory", "attachment", {
          transaction: t,
        }),
      ]);
    });
  },
};
