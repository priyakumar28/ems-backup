"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    let promises = [];
    return queryInterface.describeTable('employees').then(tableDefinition => {
      if (tableDefinition['long_absence_from']) {
        promises.push(queryInterface.removeColumn('employees', 'long_absence_from'));
      }
      if (tableDefinition['long_absence_to']) {
        promises.push(queryInterface.removeColumn('employees', 'long_absence_to'));
      }
      if (tableDefinition['terminated_on']) {
        promises.push(queryInterface.removeColumn('employees', 'terminated_on'));
      }
      if (tableDefinition['resigned_on']) {
        promises.push(queryInterface.removeColumn('employees', 'resigned_on'));
      }
      if (tableDefinition['last_working_day']) {
        promises.push(queryInterface.removeColumn('employees', 'last_working_day'));
      }
      if (tableDefinition['is_welcome_email_sent']) {
        promises.push(queryInterface.removeColumn('employees', 'is_welcome_email_sent'));
      }
      Promise.all(promises);
      promises = [];
      promises.push(queryInterface.addColumn('employees', 'long_absence_from', {
        type: Sequelize.DATE,
        allowNull: true,
      }));
      promises.push(queryInterface.addColumn('employees', 'long_absence_to', {
        type: Sequelize.DATE,
        allowNull: true
      }));
      promises.push(queryInterface.addColumn('employees', 'terminated_on', {
        type: Sequelize.DATE,
        allowNull: true
      }));
      promises.push(queryInterface.addColumn('employees', 'resigned_on', {
        type: Sequelize.DATE,
        allowNull: true
      }));
      promises.push(queryInterface.addColumn('employees', 'last_working_day', {
        type: Sequelize.DATE,
        allowNull: true
      }));
      promises.push(queryInterface.addColumn('employees', 'is_welcome_email_sent', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }));
      return Promise.all(promises);

    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("employees", "long_absence_from", { transaction: t }),
        queryInterface.removeColumn("employees", "long_absence_to", { transaction: t }),
        queryInterface.removeColumn("employees", "terminated_on", { transaction: t }),
        queryInterface.removeColumn("employees", "resigned_on", { transaction: t }),
        queryInterface.removeColumn("employees", "last_working_day", { transaction: t }),
        queryInterface.removeColumn("employees", "is_welcome_email_sent", { transaction: t })
      ]);
    });
  },
};