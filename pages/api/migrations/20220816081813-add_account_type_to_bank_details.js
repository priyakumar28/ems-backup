"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const promises = [];
    return queryInterface.describeTable('bankdetails').then(tableDefinition => {
      if (!tableDefinition['account_type']) {
        promises.push(queryInterface.addColumn('bankdetails', 'account_type', {
          type: Sequelize.ENUM("Personal", "Salaried"),
          allowNull: true,
          defaultValue: "Personal"
        }));
      }
      return Promise.all(promises);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("bankdetails", "account_type", { transaction: t })
      ]);
    });
  },
};
