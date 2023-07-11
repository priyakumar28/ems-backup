'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('overtimecategories', [{
          name:'mohammed muzammil',
          
        }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkdelete('overtimecategories', null ,{});
  }
};
