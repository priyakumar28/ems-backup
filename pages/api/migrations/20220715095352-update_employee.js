"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    let promises = [];
    return queryInterface.describeTable('employees').then(tableDefinition => {
      if (tableDefinition['department']) {
        promises.push(queryInterface.removeColumn('employees', 'department'));
      }
      if (tableDefinition['designation']) {
        promises.push(queryInterface.removeColumn('employees', 'designation'));
      }
      Promise.all(promises);
      promises = [];
      promises.push(queryInterface.addColumn('employees', 'department', {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'department',
          key: 'id'
        }
      }));
      promises.push(queryInterface.addColumn('employees', 'designation', {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'designation',
          key: 'id'
        }
      }));
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