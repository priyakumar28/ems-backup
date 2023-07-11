'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
      name:'mohammed Furqhaan',
      
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkdelete('projects', null ,{});
  }
};
