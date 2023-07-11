'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    return queryInterface.describeTable('employees').then(tableDefinition => { 
      let promises = [];
      if (tableDefinition['gender']['special'].includes('Others')) {
        promises.push(queryInterface.sequelize.query("ALTER TYPE enum_employees_gender RENAME VALUE 'Others' TO 'Transgender';"));
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
