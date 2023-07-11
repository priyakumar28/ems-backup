'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('employees',[
     {first_name: 'vinay'},
     {first_name: 'vamsi'},
     {first_name: 'jameel'},
     {first_name: 'geetha'}
])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees',null,{})
  }
};
