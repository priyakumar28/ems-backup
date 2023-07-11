"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    let promises = [];
    return queryInterface.describeTable('employees').then(tableDefinition => {
      promises.push(queryInterface.sequelize.query("ALTER TYPE enum_employees_status ADD VALUE IF NOT EXISTS  'Probation'"));
      if (!tableDefinition['probation_completion_date']) {
        promises.push(queryInterface.addColumn('employees', 'probation_completion_date', {
          type: Sequelize.DATEONLY,
          allowNull: true,
          defaultValue: null
        }));
      }
      return Promise.all(promises);
    });
  },
  async down(queryInterface, Sequelize) {
    // return queryInterface.sequelize.transaction((t) => {
    //   return Promise.all([
    //     queryInterface.removeColumn("employees", "department", { transaction: t }),
    //     queryInterface.removeColumn("employees", "designation", { transaction: t })
    //   ]);
    // });
  },
};
