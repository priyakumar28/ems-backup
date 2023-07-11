"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface.describeTable('bankdetails').then(tableDefinition => {
      if (!tableDefinition['reason_for_rejection']) {
        promises.push(queryInterface.addColumn('bankdetails', 'reason_for_rejection', {
          type: Sequelize.TEXT,
          allowNull: true
        }));
      }
      return Promise.all(promises);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("bankdetails", "reason_for_rejection", { transaction: t })
      ]);
    });
  },
};
