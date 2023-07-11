'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('employees',[{
    
     first_name : "krishna",
     
     
   }

   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees', null,{});
    
  }
};
