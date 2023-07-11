"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface
      .describeTable("employerdocuments")
      .then((tableDefinition) => {
        if (!tableDefinition["current_password"]) {
          promises.push(
            queryInterface.addColumn("employerdocuments", "current_password", {
              type: Sequelize.TEXT,
              allowNull: false,
            })
          );
        }
        return Promise.all(promises);
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("employerdocuments", "current_password", {
          transaction: t,
        }),
      ]);
    });
  },
};
