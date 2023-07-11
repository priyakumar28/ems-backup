'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('immigrationdocuments',[{
      id:2,
      name: 'siddu',
      alert_before_day_number:22
        
      }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('immigrationdocuments', null , {});
  }
};
