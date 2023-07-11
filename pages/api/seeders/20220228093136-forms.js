'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('forms',[{
    id:1,
    name: 'jack'
      
    }])
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('forms', null , {});
  }
};
