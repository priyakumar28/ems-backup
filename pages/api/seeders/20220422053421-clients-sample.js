'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("clients", [
      {
  
        name: "HR team",
        details: "employee management service",
        
        
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("clients", null, {});
  },
};
