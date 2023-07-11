'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    return queryInterface.describeTable('employees').then(tableDefinition => { 
      let promises = [];
      if (tableDefinition['status']['special'].includes('Long absense')) {
        promises.push(queryInterface.sequelize.query("ALTER TYPE enum_employees_status RENAME VALUE 'Long absense' TO 'Long absence';"));
      }
      return Promise.all(promises);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
