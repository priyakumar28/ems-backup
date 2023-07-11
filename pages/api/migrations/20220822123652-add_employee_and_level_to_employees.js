"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface.describeTable('employerdocuments').then(tableDefinition => {
      if (!tableDefinition['employee']) {
        promises.push(queryInterface.addColumn('employerdocuments', 'employee', {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "employees",
            key: "id",
          },
        }));
      }
      if (!tableDefinition['level']) {
        promises.push(queryInterface.addColumn('employerdocuments', 'level', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        }));
      }
      return Promise.all(promises);
    });

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("employerdocuments", "employee", { transaction: t }),
        queryInterface.removeColumn("employerdocuments", "level", { transaction: t })
      ]);
    });
  },
};
