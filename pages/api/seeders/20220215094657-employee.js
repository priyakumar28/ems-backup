'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees',[{
  
      first_name: 'jack'
      
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees', null , {});
  }
};
